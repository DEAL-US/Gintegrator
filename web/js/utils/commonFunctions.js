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
            }
        });
    },

    enableTooltips: function () {
        // Enable Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }
};

export { commonFunctions };