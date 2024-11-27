"use strict";

// Import the necessary API functions
import { ncbiAPI } from '/js/api/ncbi.js';

import { identicalProteinRenderer } from '/js/renderers/identical_proteins.js';
import { commonRenderer } from '/js/renderers/common.js';
import { commonFunctions } from '/js/utils/common_functions.js';

// DOM elements that we will use
const identicalProteinsDiv = document.getElementById("identical-proteins-div");
const identicalProteinsFormContainer = document.getElementById("identical-proteins-form-container");
const explanationsContainer = document.getElementById("explanations-container");

// Main function that will run when the page is ready
function main() {

    loadIdenticalProteins();

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
async function loadIdenticalProteins() {

    // Append the form to the form container
    identicalProteinsFormContainer.innerHTML = identicalProteinRenderer.ipForm();

    // Append the explanations to the explanations container
    explanationsContainer.innerHTML = identicalProteinRenderer.ipExplanations();

    // Get the form element
    let form = document.getElementById('identical-proteins-form');

    // Render previous results from localStorage
    commonFunctions.renderPreviousResults('iproteins');

    // Add an event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the form inputs
        let ids = document.getElementById('idInput').value.split(';').map(id => id.trim());
        let format = document.getElementById('formatSelect').value;

        // Show the loading spinner
        identicalProteinsDiv.innerHTML = commonRenderer.loadingSpinner();

        // Loop over the identifiers
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];

            // Update the loading spinner with progress
            document.getElementById('loading-spinner').innerHTML = commonRenderer.loadingSpinner(i, ids.length, id);


            // Create an object from the variables
            let requestData = { id, format };

            // Convert the request data to a string to use as a key
            let key = JSON.stringify(requestData);

            // Try to get the result from localStorage
            let result = localStorage.getItem(key);
            let apiSuccess = true;

            if (result) {
                // If the result is in localStorage, parse it from JSON
                result = JSON.parse(result);
            } else {
                try {
                    // Call the getNCBIIdenticalProteins API function
                    result = await ncbiAPI.getNCBIIdenticalProteins(id, format);
                } catch (e) {
                    identicalProteinsDiv.innerHTML += commonRenderer.errorMessageAPI(id);
                    apiSuccess = false;
                }
            }

            if (apiSuccess) {
                // AHA80958
                // Append the result to the identical_proteins container
                if (format === 'ids') {
                    if (result.length === 1 && Object.keys(result[0]).length === 0 || result[0].length === 0 || result === null) {
                        identicalProteinsDiv.innerHTML += commonRenderer.noResultsFound(id);
                    } else {
                        // Access the inner array and remove duplicated identifiers
                        result[0] = result[0].filter((value, index, self) => self.indexOf(value) === index);

                        // Append the result to the results container
                        identicalProteinsDiv.innerHTML += identicalProteinRenderer.asIDs(result, id);

                        // Add the result to the history if it is not already there
                        if (!localStorage.getItem(key)) {
                            commonFunctions.addToHistory(identicalProteinRenderer.asIDs(result, id), key);
                        };

                        // Store the result in localStorage
                        localStorage.setItem(key, JSON.stringify(result));
                    }
                } else { // format === 'dataframe'
                    if (Object.keys(result).length === 0) {
                        identicalProteinsDiv.innerHTML += commonRenderer.noResultsFound(id);
                    } else {

                        // Append the result to the results container
                        identicalProteinsDiv.innerHTML += identicalProteinRenderer.asDataframe(result, id);

                        // Add the result to the history if it is not already there
                        if (!localStorage.getItem(key)) {
                            commonFunctions.addToHistory(identicalProteinRenderer.asDataframe(result, id), key);
                        };

                        // Store the result in localStorage
                        localStorage.setItem(key, JSON.stringify(result));

                    }
                }
            }
        }
        // Remove the loading spinner
        var spinnerElement = document.getElementById('loading-spinner');
        if (spinnerElement) {
            spinnerElement.remove();
        }
    });
}