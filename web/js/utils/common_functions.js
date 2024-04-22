"use strict";

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




    }
};

export { commonFunctions };