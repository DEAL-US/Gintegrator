"use strict";

const commonRenderer = {

    errorMessageSameDB: function () {
        return `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 mx-auto">
                    <div class="alert alert-danger" role="alert">You cannot translate from a database to itself.</div>
                </div>
            </div>
        </div>`;
    },

    errorMessageAPI: function (id) {

        return `
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-9 col-xl-7 mx-auto">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-12 text-center pt-2">
                                <h5>${id}</h5>
                            </div>                                
                        </div>
                    </div>

                    <div class="card-body bg-light">
                        <div class="container">
                            <div class="row justify-content-center mt-3">
                                <div class="col-md-12">
                                    <div class="alert alert-danger" role="alert">Database error, please try again. If the error persists, please let us know.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>`;
    },

    errorMessageCSV: function (id) {

        return `
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-9 col-xl-7 mx-auto">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-12 text-center pt-2">
                                <h5>${id}</h5>
                            </div>                                
                        </div>
                    </div>

                    <div class="card-body bg-light">
                        <div class="container">
                            <div class="row justify-content-center mt-3">
                                <div class="col-md-12">
                                    <div class="alert alert-danger" role="alert">An error ocurred processing the CSV file, please revise it and try again.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>`;
    },

    noResultsFound: function (id) {
        return `
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-9 col-xl-7 mx-auto">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-12 text-center pt-2">
                                <h5>${id}</h5>
                            </div>                                
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="container">
                            <div class="row justify-content-center mt-3">
                                <div class="col-md-12">
                                    <div class="alert alert-info" role="alert">No results found.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>`;
    },

    loadingSpinner: function (processed, total, currentId) {
        return `
            <div id="loading-spinner">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <span style="font-size: 0.8em; color: #888;">Querying public databases, please wait...</span>
                </div>
                <div class="d-flex justify-content-center">
                    <span style="font-size: 0.8em; color: #888;">Working on identifier ${currentId}</span>
                </div>
                <div class="d-flex justify-content-center">
                    <span style="font-size: 0.8em; color: #888;">${processed}/${total} identifiers processed</span>
                </div>
            </div>
            <br>
        `;
    },

    downloadJSONButton: function () {
        return `
            <div>
                <div class="d-flex justify-content-center">
                    <button id="downloadJsonBtn" class="btn btn-secondary mb-3" disabled>Download all results</button>
                </div>
            </div>
        `;
    },

    compactViewSwitch: function () {
        return `
            <div class="d-flex justify-content-center mt-1">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="viewModeSwitch">
                    <label class="form-check-label" for="viewModeSwitch">Compact view</label>
                </div>
            </div>`;
    },

    horizontalDivider: function () {
        return `
        <hr class="hr hr-blurry" style="border: none; height: 3px; background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5), transparent);">        `;
    },
};

export { commonRenderer };