"use strict";

// Import the necessary API functions
import { uniprotAPI } from '/js/api/uniprot.js';

import { similarGenesRenderer } from '/js/renderers/similar_genes.js';
import { commonRenderer } from '/js/renderers/common.js';
import { messageRenderer } from '/js/renderers/messages.js';
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
    commonFunctions.enablePopovers();

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

    // Add an event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the form inputs
        let ids = document.getElementById('idInput').value.split(';').map(id => id.trim());
        let clusterNames = document.getElementById('clusterNamesInput').checked;

        let clusterIdentityInputs = document.getElementsByName('clusterIdentityInput');
        let clusterIdentity;
        for (let i = 0; i < clusterIdentityInputs.length; i++) {
            if (clusterIdentityInputs[i].checked) {
                clusterIdentity = clusterIdentityInputs[i].value;
                break;
            }
        }

        // Show the loading spinner
        similarGenesDiv.innerHTML = commonRenderer.loadingSpinner();

        // Loop over the identifiers
        for (let id of ids) {
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
                        localStorage.setItem(key, JSON.stringify(result));
                        similarGenesDiv.innerHTML += similarGenesRenderer.asIDs(result, clusterNames, id);
                    }
                }
            }
        }
        // Remove the loading spinner
        similarGenesDiv.innerHTML = similarGenesDiv.innerHTML.replace(commonRenderer.loadingSpinner(), '');
    });
}