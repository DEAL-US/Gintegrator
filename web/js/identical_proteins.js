"use strict";

import { sessionManager } from './utils/session.js';
import { parseHTML } from './utils/parseHTML.js';

// Import the necessary API functions
import { ncbiAPI } from '/js/api/ncbi.js';

import { identicalProteinRenderer } from '/js/renderers/identical_proteins.js';
import { commonRenderer } from '/js/renderers/common.js';
import { messageRenderer } from '/js/renderers/messages.js';

// DOM elements that we will use
const identicalProteinsDiv = document.getElementById("identical-proteins-div");
const identicalProteinsFormContainer = document.getElementById("identical-proteins-form-container");

// Main function that will run when the page is ready
function main() {

    loadIdenticalProteins();

}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////
async function loadIdenticalProteins() {

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
        let result;
        try {
            // Call the getNCBIIdenticalProteins API function
            result = await ncbiAPI.getNCBIIdenticalProteins(id, format);
        } catch (e) {
            messageRenderer.showErrorMessage(e);
        }
        // AHA80958
        // Append the result to the identical_proteins container
        if (format === 'ids') {
            if (result.length === 1 && Object.keys(result[0]).length === 0 || result[0].length === 0 || result === null) {
                identicalProteinsDiv.innerHTML = commonRenderer.noResultsFound();
            } else {
                identicalProteinsDiv.innerHTML = identicalProteinRenderer.asIDs(result);
            }
        } else { // format === 'dataframe'
            if (Object.keys(result).length === 0) {
                identicalProteinsDiv.innerHTML = commonRenderer.noResultsFound();
            } else {
                identicalProteinsDiv.innerHTML = identicalProteinRenderer.asDataframe(result);
            }
        }
    });
}