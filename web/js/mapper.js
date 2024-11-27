"use strict";

// Import the necessary API functions
import { cardAPI } from '/js/api/card.js';
import { uniprotAPI } from '/js/api/uniprot.js';
import { keggAPI } from '/js/api/kegg.js';
import { ncbiAPI } from '/js/api/ncbi.js';

import { mapperRenderer } from '/js/renderers/mapper.js';
import { commonRenderer } from './renderers/common.js';
import { commonFunctions } from '/js/utils/common_functions.js';

// Import databaseCapabilities dictionary
import { databaseCapabilities } from '/js/utils/common_functions.js';

// DOM elements that we will use
const explanationsContainer = document.getElementById("explanations-container");
const formContainer = document.getElementById("mapper-form-container");
const resultsContainer = document.getElementById("mapper-results-container");

// Main function that will run when the page is ready
function main() {

    loadMapper();

    // Enable Bootstrap popovers
    // commonFunctions.enablePopovers();

    // Enable Bootstrap tooltips
    commonFunctions.enableTooltips();

    // Enable clicking examples
    commonFunctions.enableMapperClickingExamples();
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////
async function loadMapper() {

    // Append the explanations to the explanations container
    explanationsContainer.innerHTML = mapperRenderer.mapperExplanations();

    // Append the form to the employees container
    formContainer.innerHTML = mapperRenderer.mapperForm();

    // Get the form element
    let form = document.getElementById('mapper-form');

    // Add an event listener to the "from" and "to" database select input for the checkboxes
    toggleCheckboxes();
    document.getElementById('fromDbSelect').addEventListener('change', toggleCheckboxes);
    document.getElementById('toDbSelect').addEventListener('change', toggleCheckboxes);

    // Render previous results from localStorage
    commonFunctions.renderPreviousResults('mapper');

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

        // Get the ID from the form input
        let ids = document.getElementById('idInput').value.split(',').map(id => id.trim());

        // Get the selected "from" and "to" databases from the select inputs
        let fromDb = document.getElementById('fromDbSelect').value;
        let toDb = document.getElementById('toDbSelect').value;

        // Add an event listener to the "to" database select element to clear the custom validation message
        document.getElementById('toDbSelect').addEventListener('change', function () {
            // Clear the custom validation message
            this.setCustomValidity('');
        });

        // Add an event listener to the "from" database select element to clear the custom validation message
        document.getElementById('fromDbSelect').addEventListener('change', function () {
            // Clear the custom validation message
            this.setCustomValidity('');
        });

        // Check if the selected "to" database is the default value
        if (toDb === 'default') {
            // Set a custom validation message
            document.getElementById('toDbSelect').setCustomValidity('You have to select a database.');

            // Trigger form validation
            document.getElementById('mapper-form').reportValidity();

            // Exit the function
            return;
        }

        // Check if the selected "from" database is the default value
        if (fromDb === 'default') {
            // Set a custom validation message
            document.getElementById('fromDbSelect').setCustomValidity('You have to select a database.');

            // Trigger form validation
            document.getElementById('mapper-form').reportValidity();

            // Exit the function
            return;
        }

        // Check if the selected "from" and "to" databases are the same
        if (fromDb == toDb) {
            // Set a custom validation message
            document.getElementById('toDbSelect').setCustomValidity('You cannot translate from a database to itself.');

            // Trigger form validation
            document.getElementById('mapper-form').reportValidity();

            // Exit the function
            return;
        }

        // Check if a CSV file is uploaded
        let csvFile = document.getElementById('csvInput').files[0];
        if (csvFile) {
            ids = await commonFunctions.parseCSV(csvFile);
        }

        // Mapping between the select input values and the function names
        let toDbFunctionNames = {
            'card': 'CARD',
            'uniprot': 'UniProt',
            'kegg': 'KEGG',
            'ncbiProtein': 'NCBIProtein',
            'ncbiGene': 'NCBIGene',
            'ncbiNucleotide': 'NCBINucleotide'
        };

        let toDbFunctionName = toDbFunctionNames[toDb];

        let exhaustiveMapping = document.getElementById('exhaustiveMapping').checked.toString().toUpperCase();
        let detailedMapping = document.getElementById('detailedMapping').checked.toString().toUpperCase();
        let similarGenes = document.getElementById('similarGenes').checked.toString().toUpperCase();
        let identicalProteins = document.getElementById('identicalProteins').checked.toString().toUpperCase();


        // Show the loading GIF
        resultsContainer.innerHTML = commonRenderer.loadingSpinner();

        // Loop over the identifiers
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];

            // Show the loading GIF
            document.getElementById('loading-spinner').innerHTML = commonRenderer.loadingSpinner(i, ids.length, id);

            // Convert the request data to a string to use as a key
            let key = JSON.stringify({ id, fromDb, toDb, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins });

            // Try to get the result from localStorage
            let result = localStorage.getItem(key);
            let apiSuccess = true;

            if (result) {
                // If the result is in localStorage, parse it from JSON
                result = JSON.parse(result);
            } else {
                try {
                    // Call the corresponding API function based on the selected "from" and "to" databases
                    switch (fromDb) {
                        case 'card':
                            result = await cardAPI[`getCARD2${toDbFunctionName}`](id, exhaustiveMapping = exhaustiveMapping, detailedMapping = detailedMapping, similarGenes = similarGenes, identicalProteins = identicalProteins);
                            break;
                        case 'uniprot':
                            result = await uniprotAPI[`getUniProt2${toDbFunctionName}`](id, exhaustiveMapping = exhaustiveMapping, detailedMapping = detailedMapping, similarGenes = similarGenes, identicalProteins = identicalProteins);
                            break;
                        case 'kegg':
                            result = await keggAPI[`getKEGG2${toDbFunctionName}`](id, exhaustiveMapping = exhaustiveMapping, detailedMapping = detailedMapping, similarGenes = similarGenes, identicalProteins = identicalProteins);
                            break;
                        case 'ncbiProtein':
                            result = await ncbiAPI[`getNCBIProtein2${toDbFunctionName}`](id, exhaustiveMapping = exhaustiveMapping, detailedMapping = detailedMapping, similarGenes = similarGenes, identicalProteins = identicalProteins);
                            break;
                        case 'ncbiGene':
                            result = await ncbiAPI[`getNCBIGene2${toDbFunctionName}`](id, exhaustiveMapping = exhaustiveMapping, detailedMapping = detailedMapping, similarGenes = similarGenes, identicalProteins = identicalProteins);
                            break;
                        case 'ncbiNucleotide':
                            result = await ncbiAPI[`getNCBINucleotide2${toDbFunctionName}`](id, exhaustiveMapping = exhaustiveMapping, detailedMapping = detailedMapping, similarGenes = similarGenes, identicalProteins = identicalProteins);
                            break;
                    }
                } catch (e) {
                    resultsContainer.innerHTML += commonRenderer.errorMessageAPI(id);
                    apiSuccess = false;
                }
            }

            if (apiSuccess) {
                // Append the result to the results container
                if ((result.constructor == Array && result[0] == null) ||
                    (result.constructor == Array && result[0].constructor == Object && Object.keys(result[0]).length === 0) ||
                    (result.constructor == Object && Object.keys(result).length === 0)) {
                    resultsContainer.innerHTML += commonRenderer.noResultsFound(id);
                } else {

                    // If detailedMapping == "TRUE" parse result dictionary and replace keys '1.0', '0.9', '0.5' with '100%', '90%', '50%'
                    // Considering that the dictionary may come in an array
                    if (detailedMapping === 'TRUE') {
                        let items = result.constructor == Array ? result : [result];

                        for (let i = 0; i < items.length; i++) {
                            let keys = Object.keys(items[i]);
                            for (let j = 0; j < keys.length; j++) {
                                let percentages = {
                                    'DT': 'Direct translation',
                                    '1.0': '100% similar',
                                    '0.9': '90% similar',
                                    '0.5': '50% similar'
                                };

                                if (percentages[keys[j]]) {
                                    items[i][percentages[keys[j]]] = items[i][keys[j]];
                                    delete items[i][keys[j]];
                                }
                            }
                        }

                        if (result.constructor != Array) {
                            result = items[0];
                        }
                    }

                    // Append the result to the results container
                    resultsContainer.innerHTML += mapperRenderer.asIDs(result, id, fromDb, toDb);

                    // Add the result to the history if it is not already there
                    if (!localStorage.getItem(key)) {
                        commonFunctions.addToHistory(mapperRenderer.asIDs(result, id, fromDb, toDb), key);
                    };

                    // Store the result in localStorage
                    localStorage.setItem(key, JSON.stringify(result));
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

function toggleCheckboxes() {

    var fromDb = document.getElementById('fromDbSelect').value;
    var toDb = document.getElementById('toDbSelect').value;

    // Get the capabilities of the selected "from" database
    var capabilities = databaseCapabilities[fromDb][toDb];

    // Enable or disable the checkboxes based on the capabilities
    document.getElementById('exhaustiveMapping').disabled = !capabilities.includes('exhaustiveMapping');
    document.getElementById('detailedMapping').disabled = !capabilities.includes('detailedMapping');
    document.getElementById('similarGenes').disabled = !capabilities.includes('similarGenes');
    document.getElementById('identicalProteins').disabled = !capabilities.includes('identicalProteins');
}

