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
            }
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