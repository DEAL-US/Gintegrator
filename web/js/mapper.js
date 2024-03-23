"use strict";

import { sessionManager } from './utils/session.js';
import { parseHTML } from './utils/parseHTML.js';

// Import the necessary API functions
import { cardAPI } from '/js/api/card.js';
import { uniprotAPI } from '/js/api/uniprot.js';
import { keggAPI } from '/js/api/kegg.js';
import { ncbiAPI } from '/js/api/ncbi.js';

import { messageRenderer } from '/js/renderers/messages.js';
import { mapperRenderer } from '/js/renderers/mapper.js';
import { commonRenderer } from './renderers/common.js';

// DOM elements that we will use
const formContainer = document.getElementById("mapper-form-container");
const resultsContainer = document.getElementById("mapper-results-container");

// Main function that will run when the page is ready
function main() {
    // Hide the options that shouldnt be available for not logged users
    setLoggedOptions();

    loadMapper();
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////
async function loadMapper() {

    // Append the form to the employees container
    formContainer.innerHTML = mapperRenderer.mapperForm();

    // Get the form element
    let form = document.getElementById('mapper-form');

    // Add an event listener to the "from" and "to" database select input for the checkboxes
    toggleCheckboxes();
    document.getElementById('fromDbSelect').addEventListener('change', toggleCheckboxes);
    document.getElementById('toDbSelect').addEventListener('change', toggleCheckboxes);

    // Add an event listener to the "from" and "to" database select input for the options
    updateSelectOptions();
    document.getElementById('fromDbSelect').addEventListener('change', updateSelectOptions);
    document.getElementById('toDbSelect').addEventListener('change', updateSelectOptions);

    // Enable Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Add an event listener to the form
    form.addEventListener('submit', async function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the ID from the form input
        let id = document.getElementById('idInput').value;

        // Get the selected "from" and "to" databases from the select inputs
        let fromDb = document.getElementById('fromDbSelect').value;
        let toDb = document.getElementById('toDbSelect').value;

        // Mapping between the select input values and the function names
        let toDbFunctionNames = {
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
        resultsContainer.innerHTML = commonRenderer.loadingSpinner() + '<br>';

        let result;
        try {
            // Call the corresponding API function based on the selected "from" and "to" databases
            switch (fromDb) {
                case 'card':
                    result = await cardAPI[`getCARD2${toDbFunctionName}`](id, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins);
                    break;
                case 'uniprot':
                    result = await uniprotAPI[`getUniProt2${toDbFunctionName}`](id, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins);
                    break;
                case 'kegg':
                    result = await keggAPI[`getKEGG2${toDbFunctionName}`](id, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins);
                    break;
                case 'ncbiProtein':
                    result = await ncbiAPI[`getNCBIProtein2${toDbFunctionName}`](id, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins);
                    break;
                case 'ncbiGene':
                    result = await ncbiAPI[`getNCBIGene2${toDbFunctionName}`](id, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins);
                    break;
                case 'ncbiNucleotide':
                    result = await ncbiAPI[`getNCBINucleotide2${toDbFunctionName}`](id, exhaustiveMapping, detailedMapping, similarGenes, identicalProteins);
                    break;
            }
        } catch (e) {
            messageRenderer.showErrorMessage(e);
        }

        // Append the result to the results container
        if ((result.constructor == Array && result[0] == null) ||
            (result.constructor == Array && result[0].constructor == Object && Object.keys(result[0]).length === 0) ||
            (result.constructor == Object && Object.keys(result).length === 0)) {
            console.log('aqui')
            resultsContainer.innerHTML = commonRenderer.noResultsFound();
        } else {
            // If detailedMapping == "TRUE" parse result dictionary and replace keys '1.0', '0.9', '0.5' with '100%', '90%', '50%'
            // Considering that the dictionary may come in an array
            if (detailedMapping === 'TRUE') {
                let items = result.constructor == Array ? result : [result];

                for (let i = 0; i < items.length; i++) {
                    let keys = Object.keys(items[i]);
                    for (let j = 0; j < keys.length; j++) {
                        let percentages = {
                            '1.0': '100%',
                            '0.9': '90%',
                            '0.5': '50%'
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

            resultsContainer.innerHTML = mapperRenderer.asIDs(result);
        }
    });
}


function setLoggedOptions() {
    // Hide the things that shouldnt be available for non authenticated users
    if (!sessionManager.isLogged()) {
        // newDpmtButton.style.display = "none";
    }
}

function updateSelectOptions() {
    var fromDbSelect = document.getElementById('fromDbSelect');
    var toDbSelect = document.getElementById('toDbSelect');

    var fromDb = fromDbSelect.value;
    var toDb = toDbSelect.value;

    // Enable all options
    for (let i = 0; i < fromDbSelect.options.length; i++) {
        fromDbSelect.options[i].disabled = false;
        toDbSelect.options[i].disabled = false;
    }

    // Disable the same option in the "to" select as the selected option in the "from" select
    for (let i = 0; i < toDbSelect.options.length; i++) {
        if (toDbSelect.options[i].value === fromDb) {
            toDbSelect.options[i].disabled = true;
            break;
        }
    }

    // Disable the same option in the "from" select as the selected option in the "to" select
    for (let i = 0; i < fromDbSelect.options.length; i++) {
        if (fromDbSelect.options[i].value === toDb) {
            fromDbSelect.options[i].disabled = true;
            break;
        }
    }
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

// Define a mapping of the databases and the parameters they support
const databaseCapabilities = {
    'card': {
        'uniprot': ['exhaustiveMapping', 'detailedMapping'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiProtein': [],
        'ncbiGene': ['exhaustiveMapping'],
        'ncbiNucleotide': []
    },
    'uniprot': {
        'card': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiProtein': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiGene': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiNucleotide': ['exhaustiveMapping', 'detailedMapping', 'similarGenes']
    },
    'kegg': {
        'card': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiProtein': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiGene': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiNucleotide': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'uniprot': ['exhaustiveMapping']
    },
    'ncbiProtein': {
        'card': ['exhaustiveMapping'],
        'uniprot': ['exhaustiveMapping', 'detailedMapping', 'byIdenticalProteins'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiGene': ['exhaustiveMapping'],
        'ncbiNucleotide': ['exhaustiveMapping']
    },
    'ncbiNucleotide': {
        'card': ['exhaustiveMapping'],
        'uniprot': ['exhaustiveMapping', 'detailedMapping', 'byIdenticalProteins'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiGene': ['exhaustiveMapping'],
        'ncbiProtein': ['exhaustiveMapping']
    },
    'ncbiGene': {
        'card': ['exhaustiveMapping'],
        'uniprot': ['exhaustiveMapping', 'detailedMapping', 'byIdenticalProteins'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiProtein': ['exhaustiveMapping'],
        'ncbiNucleotide': ['exhaustiveMapping']
    }
};