"use strict";

// Import mapperRenderer
import { mapperRenderer } from '/js/renderers/mapper.js';
// Import identicalProteinRenderer
import { identicalProteinRenderer } from '/js/renderers/identical_proteins.js';
// Import similarGenesRenderer
import { similarGenesRenderer } from '/js/renderers/similar_genes.js';


// Define a mapping of the databases and the parameters they support
export const databaseCapabilities = {
    'default': {
        'card': [], // 'card' to 'card' is not supported
        'uniprot': [],
        'kegg': [],
        'ncbiProtein': [],
        'ncbiGene': [],
        'ncbiNucleotide': [],
        'default': []
    },
    'card': {
        'card': [], // 'card' to 'card' is not supported
        'uniprot': ['exhaustiveMapping', 'detailedMapping'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiProtein': [],
        'ncbiGene': ['exhaustiveMapping'],
        'ncbiNucleotide': [],
        'default': []
    },
    'uniprot': {
        'uniprot': [], // 'uniprot' to 'uniprot' is not supported
        'card': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiProtein': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiGene': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiNucleotide': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'default': []
    },
    'kegg': {
        'kegg': [], // 'kegg' to 'kegg' is not supported
        'card': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiProtein': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiGene': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'ncbiNucleotide': ['exhaustiveMapping', 'detailedMapping', 'similarGenes'],
        'uniprot': ['exhaustiveMapping'],
        'default': []
    },
    'ncbiProtein': {
        'ncbiProtein': [], // 'ncbiProtein' to 'ncbiProtein' is not supported
        'card': ['exhaustiveMapping'],
        'uniprot': ['exhaustiveMapping', 'detailedMapping', 'identicalProteins'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiGene': ['exhaustiveMapping'],
        'ncbiNucleotide': ['exhaustiveMapping'],
        'default': []
    },
    'ncbiNucleotide': {
        'ncbiNucleotide': [], // 'ncbiNucleotide' to 'ncbiNucleotide' is not supported
        'card': ['exhaustiveMapping'],
        'uniprot': ['exhaustiveMapping', 'detailedMapping', 'identicalProteins'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiGene': ['exhaustiveMapping'],
        'ncbiProtein': ['exhaustiveMapping'],
        'default': []
    },
    'ncbiGene': {
        'ncbiGene': [], // 'ncbiGene' to 'ncbiGene' is not supported
        'card': ['exhaustiveMapping'],
        'uniprot': ['exhaustiveMapping', 'detailedMapping', 'identicalProteins'],
        'kegg': ['exhaustiveMapping', 'detailedMapping', 'similarGenes', 'identicalProteins'],
        'ncbiProtein': ['exhaustiveMapping'],
        'ncbiNucleotide': ['exhaustiveMapping'],
        'default': []
    }
};

const commonFunctions = {

    enablePopovers: function () {
        // Enable Bootstrap popovers
        var popoverIcon = document.getElementById('popoverIcon');
        var popover = new bootstrap.Popover(popoverIcon, {
            html: true
        });
        popoverIcon.addEventListener('click', function () {
            if (popover._popper) {
                popover.hide();
            } else {
                popover.show();

                // Add event listener to all the span with class clipb
                var clipboardButtons = document.querySelectorAll('.clipb-span');

                clipboardButtons.forEach(function (button) {
                    button.addEventListener('click', function () {

                        var text = button.textContent.trim();

                        // Select the element with id "idInput"
                        var input = document.getElementById('idInput');

                        // If text not already in input.value, add it
                        if (!input.value.includes(text)) {
                            // If input is empty, add text, if not, add ; text
                            if (input.value == '') {
                                input.value += text;
                            } else {
                                input.value += '; ' + text;
                            }
                        }

                        // navigator.clipboard.writeText(text).then(function () {
                        //     // Store the original text
                        //     var originalText = button.previousSibling.textContent;
                        //     // Hide the button
                        //     button.style.display = 'none';
                        //     // Replace the text with "Copied!"
                        //     button.previousSibling.textContent = ' Copied to clipboard!';
                        //     // Change the text back to the original text after 2 seconds
                        //     setTimeout(function () {
                        //         button.previousSibling.textContent = originalText;
                        //         button.style.display = 'inline';
                        //     }, 1500);
                        // }, function (err) {
                        //     console.error('Could not copy text: ', err);
                        // });

                    });
                });
                // Add event listener to the document to hide the popover when clicking outside of it
                document.addEventListener('click', function (event) {
                    var popoverElement = document.querySelector('.popover');
                    if (!popoverIcon.contains(event.target) && (!popoverElement || !popoverElement.contains(event.target))) {
                        popover.hide();
                    }
                });
            }
        });
    },

    enableClickingExamples: function () {
        // Add event listener to all the span with class clipb
        var clipboardButtons = document.querySelectorAll('.clipb-span');

        clipboardButtons.forEach(function (button) {
            button.addEventListener('click', function () {

                var text = button.textContent.trim();

                // Select the element with id "idInput"
                var input = document.getElementById('idInput');

                // If text not already in input.value, add it
                if (!input.value.includes(text)) {
                    // If input is empty, add text, if not, add ; text
                    if (input.value == '') {
                        input.value += text;
                    } else {
                        input.value += '; ' + text;
                    }
                }
            });
        });
    },

    enableMapperClickingExamples: function () {

        let examplesCARD = `Enter CARD ID:<br><h5 class="example-text"> (examples: <span class="clipb-span">ARO:3002535</span>; <span class="clipb-span">ARO:3000938</span>)</h5>`;
        let examplesNCBIProtein = `Enter NCBI Protein ID:<br><h5 class="example-text"> (examples: <span class="clipb-span">CAA79696</span>; <span class="clipb-span">WP_010896559.1</span>)</h5>`;
        let examplesNCBIGene = `Enter NCBI Gene ID:<br><h5 class="example-text"> (examples: <span class="clipb-span">76524190</span>; <span class="clipb-span">1272</span>)</h5>`;
        let examplesNCBINucleotide = `Enter NCBI Nucleotide ID:<br><h5 class="example-text"> (examples: <span class="clipb-span">AY536519</span>; <span class="clipb-span">JQ394987</span>; <span class="clipb-span">Z21488</span>)</h5>`;
        let examplesUniProt = `Enter UniProt ID:<br><h5 class="example-text"> (examples: <span class="clipb-span">G0L217</span>; <span class="clipb-span">G9JVE6</span>; <span class="clipb-span">Q6R7P5</span>)</h5>`;
        let examplesKEGG = `Enter KEGG ID:<br><h5 class="example-text"> (examples: <span class="clipb-span">ag:ACC85616</span>; <span class="clipb-span">aag:5579347</span>; <span class="clipb-span">llo:LLO_2673</span>)</h5>`;

        // Modify form idInput label content depending on From database selected in the form
        // Get the fromDbSelect and idInput elements
        let fromDbSelect = document.getElementById('fromDbSelect');
        let idInputLabel = document.getElementById('idInputLabel');

        // Add an event listener for the change event
        fromDbSelect.addEventListener('change', function () {
            document.getElementById('idInput').value = '';
            // Get the new value
            let newValue = fromDbSelect.value;

            // Update the idInput label's content based on the new value
            switch (newValue) {
                case 'card':
                    idInputLabel.innerHTML = examplesCARD;
                    break;
                case 'ncbiProtein':
                    idInputLabel.innerHTML = examplesNCBIProtein;
                    break;
                case 'ncbiGene':
                    idInputLabel.innerHTML = examplesNCBIGene;
                    break;
                case 'ncbiNucleotide':
                    idInputLabel.innerHTML = examplesNCBINucleotide;
                    break;
                case 'uniprot':
                    idInputLabel.innerHTML = examplesUniProt;
                    break;
                case 'kegg':
                    idInputLabel.innerHTML = examplesKEGG;
                    break;
                default:
                    idInputLabel.innerHTML = 'Enter ID:';
                    break;
            }

            // Add event listener to all the span with class clipb
            var clipboardButtons = document.querySelectorAll('.clipb-span');

            clipboardButtons.forEach(function (button) {
                button.addEventListener('click', function () {

                    var text = button.textContent.trim();

                    // Select the element with id "idInput"
                    var input = document.getElementById('idInput');

                    // If text not already in input.value, add it
                    if (!input.value.includes(text)) {
                        // If input is empty, add text, if not, add ; text
                        if (input.value == '') {
                            input.value += text;
                        } else {
                            input.value += '; ' + text;
                        }
                    }
                });
            });

        });

    },

    enableTooltips: function () {
        // Enable Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

    },

    addClipboardEventListeners: function () {
    },

    addToHistory: function (resultHTML) {
        let historyAccordionBody = document.getElementById('historyAccordionBody');
        historyAccordionBody.innerHTML += resultHTML;
    },


    renderPreviousResults: function (historyType) {

        let historyContainer = document.getElementById("history-container");

        // Initialize historyContainer with a bootstrap collapsible element
        historyContainer.innerHTML = `
            <div class="accordion mb-3" id="historyAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" >
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#historyCollapse" aria-expanded="false" aria-controls="historyCollapse" style="background-color: #f5f5f5; color: #000; font-size:0.6em">
                            Previous results
                        </button>
                    </h2>
                    <div id="historyCollapse" class="accordion-collapse collapse" data-bs-parent="#historyAccordion">
                        <div class="accordion-body" id="historyAccordionBody" style="max-height: 500px; overflow:auto; background-color: #fafafa;">
                            No results yet.
                        </div>
                    </div>
                </div>
            </div>`;

        // Get all the keys from localStorage
        let keys = Object.keys(localStorage);

        let resultHTML = '';
        let historyAccordionBody = document.getElementById('historyAccordionBody');

        // Function to add the parameters used in each request in the history 
        function addHistoryParameters(htmlElement, requestData) {
            let parametersHTML = `
            <div class="row mt-3">`;

            // Get the available parameters for the selected databases
            let availableParameters = databaseCapabilities[requestData.fromDb][requestData.toDb];

            let count = 0;
            for (let key in requestData) {
                // Ignore the "id" parameter and parameters not available for the selected databases
                if (key !== 'id' && (availableParameters.length > 0 && availableParameters.includes(key))) {

                    if (requestData[key] === 'TRUE' || requestData[key] === 'FALSE') {
                        parametersHTML += `
                            <div class="col-12 col-sm-6 col-md-6 col-lg-4 ps-auto">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" ${requestData[key] === 'TRUE' ? 'checked' : ''} disabled>
                                    <label class="form-check-label" style="opacity:1;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}</label>
                                </div>
                            </div>
                        `;
                        count++;
                    }
                }
            }
            parametersHTML += `</div>`;
            if (count === 0) {
                parametersHTML = '<div></div>';
            }
            // Select the element with id "history-parameters" in htmlElement, add the parametersHTML to it and return the new htmlElement
            let doc = (new DOMParser()).parseFromString(htmlElement, "text/html");
            doc.getElementById('history-params').innerHTML = parametersHTML;
            return ((new XMLSerializer()).serializeToString(doc));
        }

        // Loop over the keys
        for (let key of keys) {
            // Parse the key from JSON
            let requestData = JSON.parse(key);

            // If we are rendering the identical proteins history
            if (historyType === 'mapper') {
                // Check if the key is a mapping key
                if (requestData.hasOwnProperty('fromDb') && requestData.hasOwnProperty('toDb')) {
                    // Get the result from localStorage
                    let result = JSON.parse(localStorage.getItem(key));

                    // Append the result to the results container
                    resultHTML += addHistoryParameters(mapperRenderer.asIDs(result, requestData.id, requestData.fromDb, requestData.toDb), requestData);
                }
            } else if (historyType === 'iproteins') {
                // Check if the key is an identical proteins key
                if (requestData.hasOwnProperty('id') && requestData.hasOwnProperty('format')) {
                    // Get the result from localStorage
                    let result = JSON.parse(localStorage.getItem(key));

                    // Append the result to the results container depending on the format
                    if (requestData.format === 'ids') {
                        resultHTML += identicalProteinRenderer.asIDs(result, requestData.id);
                    } else {
                        resultHTML += identicalProteinRenderer.asDataframe(result, requestData.id);
                    }
                }
            } else if (historyType === 'sgenes') {
                // Check if the key is a similar genes key
                if (requestData.hasOwnProperty('id') && requestData.hasOwnProperty('clusterNames') && requestData.hasOwnProperty('clusterIdentity')) {
                    // Get the result from localStorage
                    let result = JSON.parse(localStorage.getItem(key));

                    // Append the result to the results container
                    resultHTML += similarGenesRenderer.asIDs(result, requestData.clusterNames, requestData.id, requestData.clusterIdentity);
                }
            }

        }
        historyAccordionBody.innerHTML = resultHTML;
    },
};

export { commonFunctions };