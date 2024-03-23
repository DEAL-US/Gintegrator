"use strict";

import { sessionManager } from './utils/session.js';
import { parseHTML } from './utils/parseHTML.js';

// Import the necessary API functions
import { uniprotAPI } from '/js/api/uniprot.js';

import { similarGenesRenderer } from '/js/renderers/similar_genes.js';
import { commonRenderer } from '/js/renderers/common.js';
import { messageRenderer } from '/js/renderers/messages.js';

// DOM elements that we will use
const similarGenesDiv = document.getElementById("similar-genes-div");
const similarGenesFormContainer = document.getElementById("similar-genes-form-container");

// Main function that will run when the page is ready
function main() {

    loadSimilarGenes();

}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////
async function loadSimilarGenes() {

    // Append the form to the form container
    similarGenesFormContainer.innerHTML = similarGenesRenderer.sgForm();

    // Get the form element
    let form = document.getElementById('similar-genes-form');

    // Enable Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Add an event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the form inputs
        let id = document.getElementById('idInput').value;
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
        
        // Q2A799
        let result;
        try {
            // Call the getUniProtSimilarGenes API function
            result = await uniprotAPI.getUniProtSimilarGenes(id, clusterIdentity, clusterNames.toString().toUpperCase());
        } catch (e) {
            messageRenderer.showErrorMessage(e);
        }

        // Check if the result is empty
        if (result === null ||
            (Array.isArray(result) && result.length === 0) ||
            (Array.isArray(result) && result.length === 1 && Object.keys(result[0]).length === 0) ||
            (Array.isArray(result) && result.length === 1 && Object.values(result[0])[0] && Object.keys(Object.values(result[0])[0]).length === 0)) {
                similarGenesDiv.innerHTML = commonRenderer.noResultsFound();
        } else {
            // Append the result to the similarGenesDiv container
            if (result === null || result.length === 0 || (result.length === 1 && Object.keys(result[0]).length === 0)) {
                similarGenesDiv.innerHTML = commonRenderer.noResultsFound();
            } else {
                similarGenesDiv.innerHTML = similarGenesRenderer.asIDs(result, clusterNames);
            }
        }

    });
}