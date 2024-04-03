"use strict";

// Import the necessary API functions
import { ncbiAPI } from '/js/api/ncbi.js';

import { identicalProteinRenderer } from '/js/renderers/identical_proteins.js';
import { commonRenderer } from '/js/renderers/common.js';
import { messageRenderer } from '/js/renderers/messages.js';
import { commonFunctions } from '/js/utils/commonFunctions.js';

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
    commonFunctions.enablePopovers();
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////
async function loadIdenticalProteins() {

    // Append the explanations to the explanations container
    explanationsContainer.innerHTML = identicalProteinRenderer.ipExplanations();

    // Append the form to the form container
    identicalProteinsFormContainer.innerHTML = identicalProteinRenderer.ipForm();

    // Get the form element
    let form = document.getElementById('identical-proteins-form');

    // Add an event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the form inputs
        let id = document.getElementById('idInput').value;
        let format = document.getElementById('formatSelect').value;

        // Show the loading spinner
        identicalProteinsDiv.innerHTML = commonRenderer.loadingSpinner();

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
                identicalProteinsDiv.innerHTML = commonRenderer.errorMessageAPI();
                apiSuccess = false;
            }
        }

        if (apiSuccess) {
            // AHA80958
            // Append the result to the identical_proteins container
            if (format === 'ids') {
                if (result === null || result.length === 1 && Object.keys(result[0]).length === 0 || result[0].length === 0) {
                    identicalProteinsDiv.innerHTML = commonRenderer.noResultsFound();
                } else {
                    localStorage.setItem(key, JSON.stringify(result));
                    identicalProteinsDiv.innerHTML = identicalProteinRenderer.asIDs(result);
                }
            } else { // format === 'dataframe'
                if (Object.keys(result).length === 0) {
                    identicalProteinsDiv.innerHTML = commonRenderer.noResultsFound();
                } else {
                    localStorage.setItem(key, JSON.stringify(result));
                    identicalProteinsDiv.innerHTML = identicalProteinRenderer.asDataframe(result);
                }
            }
        }
    });
}