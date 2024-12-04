"use strict";

const similarGenesRenderer = {

    sgExplanations: function () {
        let examples = ``;

        let deprecated = `
        <span class="clipb-span">G0L217 
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        <span class="clipb-span">B2ZPD3
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        <span class="clipb-span">A0A0B5ECY2
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        <span class="clipb-span">Q2A799
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        <p class="lead" style="font-size: 1.1em;">
        Input a valid UniProt identifier to fetch gene clusters or groups that are identical on the specified percentage. Names of the clusters can be retrieved as well.
        You can find identifier examples
        <span id='popoverIcon' style="text-decoration: underline; cursor: pointer;" tabindex="0" data-bs-toggle="popover"
            data-bs-trigger="manual" title="" data-bs-content='${examples}'>
            here</span>.
        </p>  `;


        return `
        <p class="lead" style="font-size: 1.1em;">
            Input a valid UniProt identifier, a list of them separated by commas or a CSV file with them in order to fetch gene clusters or groups that are identical on the specified percentage. Names of the clusters can be retrieved as well.
        </p>    
        `;
    },

    // HTML form with Bootstrap 4 classes
    sgForm: function () {
        let examples = `
        <span class="clipb-span">G0L217</span>,
        <span class="clipb-span">B2ZPD3</span>,
        <span class="clipb-span">A0A0B5ECY2</span>,
        <span class="clipb-span">Q2A799</span>`;

        return `
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-9 col-xl-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <form id="similar-genes-form">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                        <label for="idInput">Enter UniProt ID:<br><h5 class="example-text"> (examples: ${examples})</h5></label>                                            
                                        <input type="text" id="idInput" name="idInput" class="form-control" placeholder="identifier1, identifier2, identifier3..." required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="mb-3">
                                                <label for="csvInput" class="form-label">Or upload a CSV file with identifiers:</label>
                                                <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                                title="The file can contain identifiers separated by commas or one identifier per line" class="info-icon">
                                                <input type="file" class="form-control" id="csvInput" accept=".csv">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <label class="mt-3">Cluster Identity:</label>
                                <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                title="% of identity of the cluster to be retrieved" class="info-icon">
                                <div class="row mt-1  justify-content-center">
                                    <div class="col-4 col-sm-4 col-md-4 d-flex justify-content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="clusterIdentityInput"
                                                id="clusterIdentity1" value="1.0" checked>
                                            <label class="form-check-label" for="clusterIdentity1">
                                                100%
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-4 col-sm-4 col-md-4 d-flex justify-content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="clusterIdentityInput"
                                                id="clusterIdentity0.9" value="0.9">
                                            <label class="form-check-label" for="clusterIdentity0.9">
                                                90%
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-4 col-sm-4 col-md-4 d-flex justify-content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="clusterIdentityInput"
                                                id="clusterIdentity0.5" value="0.5">
                                            <label class="form-check-label" for="clusterIdentity0.5">
                                                50%
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="row">
                                    <div class="col-md-12 mt-4">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" id="clusterNamesInput"
                                                name="clusterNamesInput">
                                            <label class="form-check-label" for="clusterNamesInput">
                                                Clusters Names
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col-md-12 mt-4 d-flex justify-content-center">
                                    <input type="submit" value="Submit" class="btn btn-secondary">
                                </div>
                            </form>
                        </div>
                    </div>
                        <div id="cvSwitchDiv"></div>
                </div>
            </div>
        </div>
    </div>
        <br>
        `;
    },

    asIDs: function (result, clusterNames, id, clusterIdentity) {
        // Map clusterIdentity value from 1.0 to 100, 0.9 to 90, and 0.5 to 50
        clusterIdentity = clusterIdentity * 100;

        // Create a Blob object from the result
        let blob = new Blob([JSON.stringify(result)], { type: 'application/json' });

        // Create a URL for the Blob object
        let url = URL.createObjectURL(blob);

        let listHTML = `
            <div class="col-12 col-md-12 col-lg-6 col-xl-5 col-xxl-5 col-xxxl-4 mb-3">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-12 col-sm-8 col-md-7 col-lg-8 pt-2">
                                <div class="simgenes-diagram detailed-view">
                                    <div class="simgenes-center">
                                        <img src="/images/uniprot_logo.png" alt="uniprot_logo" class="simgenes-logo">
                                        <span class="simgenes-id text-muted ms-2">${clusterIdentity}% similar genes</span>
                                    </div>
                                        <h5>${id}</h5>
                                </div>
                                <div class="simgenes compact-view" style="display: none;">
                                    <span style="font-size: 1.35em;">${id}</span>
                                    <span class="text-muted ms-2 text-start" style="font-size: 0.875em;">${clusterIdentity}% similar genes</span>
                                </div>
                            </div>
                            <div class="col-12 col-sm-4 col-md-5 col-lg-4 text-end text-md-end text-center my-auto">
                                <button class="btn btn-secondary" type="button" id="downloadButton">
                                    <a href="${url}" download="${id}_similar_genes_${clusterIdentity}.json" style="color: inherit; text-decoration: none;">Download JSON</a>
                                </button>      
                            </div>
                        </div>
                        <div class="row">
                            <div id="history-params" class="col-12">
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="container">

        `;

        function mapIdentifiers(result) {
            return result.map(id => `
                <li class="list-group-item">${id.trim()}
                    <a href="https://www.uniprot.org/uniprotkb/${id.trim()}" target="_blank" style="font-size: 0.6em">
                        View in Database <i class="fa fa-external-link"></i>
                    </a>
                </li>`).join('');
        }

        if (clusterNames) {
            // If result is an object of cluster names and identifiers
            for (let clusterName in result[0]) {
                let identifiers = result[0][clusterName].join(', ');
                listHTML += `
                    <div class="row justify-content-center mt-1">
                        <div class="col-md-12">
                            <h5 class="mb-3">Cluster ${clusterName}</h5>
                            <div style="max-height: 500px; overflow-y: auto;">
                                <ul class="list-group">
                                    ${mapIdentifiers(identifiers.split(','))}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            // If result is an array of identifiers
            let identifiers = result[0];
            listHTML += `
                    <div class="row justify-content-center mt-1">
                        <div class="col-md-12">
                            <div style="max-height: 500px; overflow-y: auto;">
                                <ul class="list-group">
                                    ${mapIdentifiers(identifiers)}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
        }
        listHTML += `
                        </div>
                    </div>
                </div>
            </div>
        
        <br>`;
        return listHTML;
    },

    noResultsFound: function () {
        return '<div class="alert alert-info" role="alert">No results found.</div>';
    }
};

export { similarGenesRenderer };