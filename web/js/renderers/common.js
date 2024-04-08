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
        // return `
        // <div class="container">
        //     <div class="row justify-content-center">
        //         <div class="col-lg-7 mx-auto">
        //             <div class="alert alert-danger" role="alert">Database error, please try again. If the error persists, please let us know.</div>
        //         </div>
        //     </div>
        // </div>`;

        return `
        <div class="row justify-content-center">
            <div class="col-lg-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 text-center pt-2">
                                    <h5>${id}</h5>
                                </div>                                
                            </div>
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

    // noResultsFound: function () {
    //     return `
    //     <div class="container">
    //         <div class="row justify-content-center">
    //             <div class="col-lg-7 mx-auto">
    //                 <div class="alert alert-info" role="alert">No results found.</div>
    //             </div>
    //         </div>
    //     </div>`;
    // },

    noResultsFound: function(id) {
        return `
        <div class="row justify-content-center">
            <div class="col-lg-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 text-center pt-2">
                                    <h5>${id}</h5>
                                </div>                                
                            </div>
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