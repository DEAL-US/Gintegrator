"use strict";

import { parseHTML } from '../utils/parseHTML.js';

const commonRenderer = {

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
        `;
    }
};

export { commonRenderer };