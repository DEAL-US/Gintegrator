"use strict";

// Import the necessary API functions
import { uniprotAPI } from '/js/api/uniprot.js';

import { similarGenesRenderer } from '/js/renderers/similar_genes.js';
import { commonRenderer } from '/js/renderers/common.js';
import { commonFunctions } from '/js/utils/common_functions.js';

// DOM elements that we will use
const explanationsContainer = document.getElementById("explanations-container");
const similarGenesDiv = document.getElementById("similar-genes-div");
const similarGenesFormContainer = document.getElementById("similar-genes-form-container");

// Main function that will run when the page is ready
function main() {

    loadSimilarGenes();

    // Enable Bootstrap tooltips
    commonFunctions.enableTooltips();

    // Enable Bootstrap popovers
    // commonFunctions.enablePopovers();

    // Enable clicking examples
    commonFunctions.enableClickingExamples();

}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////
async function loadSimilarGenes() {

    // Append the explanations to the explanations container
    explanationsContainer.innerHTML = similarGenesRenderer.sgExplanations();

    // Append the form to the form container
    similarGenesFormContainer.innerHTML = similarGenesRenderer.sgForm();

    // Get the form element
    let form = document.getElementById('similar-genes-form');

    // Render previous results from localStorage
    commonFunctions.renderPreviousResults('sgenes');

    // Add an event listener to the CSV input to enable/disable the text input
    document.getElementById('csvInput').addEventListener('change', function () {
        let csvFile = document.getElementById('csvInput').files[0];
        let idInput = document.getElementById('idInput');
        if (csvFile) {
            idInput.disabled = true;
            idInput.removeAttribute('required');
        } else {
            idInput.disabled = false;
            idInput.setAttribute('required', 'required');
        }
    });

    // Add an event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the form inputs
        let ids = document.getElementById('idInput').value.split(',').map(id => id.trim());
        let clusterNames = document.getElementById('clusterNamesInput').checked;

        let clusterIdentityInputs = document.getElementsByName('clusterIdentityInput');
        let clusterIdentity;
        for (let i = 0; i < clusterIdentityInputs.length; i++) {
            if (clusterIdentityInputs[i].checked) {
                clusterIdentity = clusterIdentityInputs[i].value;
                break;
            }
        }

        // Check if a CSV file is uploaded
        let csvFile = document.getElementById('csvInput').files[0];
        if (csvFile) {
            ids = await commonFunctions.parseCSV(csvFile);
        }

        // Show the loading spinner
        similarGenesDiv.innerHTML = commonRenderer.loadingSpinner();

        // Add the download JSON button
        similarGenesDiv.innerHTML += commonRenderer.downloadJSONButton();

        let allResults = new Map();

        // Loop over the identifiers
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];

            // Update the loading spinner with progress
            document.getElementById('loading-spinner').innerHTML = commonRenderer.loadingSpinner(i, ids.length, id);

            // Create an object from the variables
            let requestData = { id, clusterNames, clusterIdentity };

            // Convert the request data to a string to use as a key
            let key = JSON.stringify(requestData);

            // Try to get the result from localStorage
            let result = localStorage.getItem(key);
            let apiSuccess = true;

            if (result) {
                // If the result is in localStorage, parse it from JSON
                result = JSON.parse(result);
            } else {
                // Q2A799
                try {
                    // Call the getUniProtSimilarGenes API function
                    result = await uniprotAPI.getUniProtSimilarGenes(id, clusterIdentity, clusterNames.toString().toUpperCase());
                } catch (e) {
                    similarGenesDiv.innerHTML += commonRenderer.errorMessageAPI(id);
                    apiSuccess = false;
                }
            }

            if (apiSuccess) {
                // Check if the result is empty
                if (result === null ||
                    (Array.isArray(result) && result.length === 0) ||
                    (Array.isArray(result) && result.length === 1 && Object.keys(result[0]).length === 0) ||
                    (Array.isArray(result) && result.length === 1 && Object.values(result[0])[0] && Object.keys(Object.values(result[0])[0]).length === 0)) {
                    similarGenesDiv.innerHTML += commonRenderer.noResultsFound(id);
                } else {
                    // Append the result to the similarGenesDiv container
                    if (result === null || result.length === 0 || (result.length === 1 && Object.keys(result[0]).length === 0)) {
                        similarGenesDiv.innerHTML += commonRenderer.noResultsFound(id);
                    } else {
                        // Append the result to the results container
                        similarGenesDiv.innerHTML += similarGenesRenderer.asIDs(result, clusterNames, id, clusterIdentity);

                        // Add the result to the history if it is not already there
                        if (!localStorage.getItem(key)) {
                            commonFunctions.addToHistory(similarGenesRenderer.asIDs(result, clusterNames, id, clusterIdentity), key);
                        };

                        // Store the result in localStorage
                        localStorage.setItem(key, JSON.stringify(result));

                        // Store the result in allResults
                        allResults.set(requestData, result[0]);

                    }
                }
            }

            // Enable download JSON button if allResults is not empty
            if (allResults.size > 0) {
                // Enable the download JSON button
                document.getElementById('downloadJsonBtn').disabled = false;
            }

            // Add event listener to the download button
            let downloadJsonBtn = document.getElementById('downloadJsonBtn');
            if (downloadJsonBtn) {
                downloadJsonBtn.addEventListener('click', function () {
                    // Convert the Map to an array of key-value pairs
                    let allResultsArray = Array.from(allResults.entries());
                    // Create a JSON blob from the array
                    let jsonBlob = new Blob([JSON.stringify(allResultsArray, null, 2)], { type: 'application/json' }); 
                    let url = URL.createObjectURL(jsonBlob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'similar_genes_results.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            }

        }
        // Remove the loading spinner
        var spinnerElement = document.getElementById('loading-spinner');
        if (spinnerElement) {
            spinnerElement.remove();
        }
    });
}