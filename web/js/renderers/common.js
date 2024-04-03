"use strict";

const commonRenderer = {

    errorMessageAPI: function () {
        return `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 mx-auto">
                    <div class="alert alert-danger" role="alert">Database error, please try again. If the error persists, please let us know.</div>
                </div>
            </div>
        </div>`;
    },

    noResultsFound: function () {
        return `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 mx-auto">
                    <div class="alert alert-info" role="alert">No results found.</div>
                </div>
            </div>
        </div>`;
    },

    loadingSpinner: function () {
        return `
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <span style="font-size: 0.8em; color: #888;">Querying public databases, please wait...</span>
            </div>
            <br>
        `;
    }
};

export { commonRenderer };