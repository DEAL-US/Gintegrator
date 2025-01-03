"use strict";

const identicalProteinRenderer = {

    ipExplanations: function () {
        return `
        <p class="lead" style="font-size: 1.1em;">
            Provide a valid NCBI identifier, a list of them separated by commas or a CSV file to retrieve identical proteins identifiers.
        </p>    
        `;
    },

    // HTML form with Bootstrap 4 classes
    ipForm: function () {
        let examples = `
        <span class="clipb-span">AHA80958</span>,
        <span class="clipb-span">76524190</span>,
        <span class="clipb-span">WP_010896559</span>,
        <span class="clipb-span">ABK33456</span>`;

        return `
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-9 col-xl-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <form id="identical-proteins-form">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="idInput">Enter NCBI ID:<br><h5 class="example-text"> (examples: ${examples})</h5></label>
                                            <input type="text" id="idInput" name="idInput" class="form-control" required placeholder="identifier1, identifier2, identifier3...">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div>
                                                <label for="csvInput" class="form-label">Or upload a CSV file with identifiers:</label>
                                                <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                                title="The file can contain identifiers separated by commas or one identifier per line" class="info-icon">
                                                <input type="file" class="form-control" id="csvInput" accept=".csv">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div class="form-group ">
                                            <label for="formatSelect">Format:</label>
                                            <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                                title="Format of the retrieved results: a list of identifiers or a more detailed table (dataframe)" class="info-icon">
                                            <select id="formatSelect" name="formatSelect" class="form-select mt-1" required>
                                                <option value="ids">Identifiers</option>
                                                <option value="dataframe">Dataframe</option>
                                            </select>
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

    asIDs: function (result, id) {
        // Create a Blob object from the result
        let blob = new Blob([JSON.stringify(result)], { type: 'application/json' });

        // Create a URL for the Blob object
        let url = URL.createObjectURL(blob);

        function mapIdentifiers(result) {
            return result[0].map(id => `
                <li class="list-group-item">${id.trim()}
                    <a href="https://www.ncbi.nlm.nih.gov/protein/${id.trim()}" target="_blank" style="font-size: 0.6em">
                        View in Database <i class="fa fa-external-link"></i>
                    </a>
                </li>`).join('');
        }

        let listHTML = `
            <div class="col-12 col-md-12 col-lg-6 col-xl-5 col-xxl-5 col-xxxl-4 mb-3">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col pt-2">
                                <div class="iproteins-diagram detailed-view">
                                    <img src="/images/ncbiProteinGroups_logo.png" alt="ncbiProteinGroups_logo" class="iproteins-logo">
                                        <h5>${id}</h5>
                                </div>
                                <div class="iproteins-diagram compact-view" style="display: none;">
                                    <h5>${id}</h5>
                                    <span class="text-muted ms-2 text-start" style="font-size: 0.875em;">NCBI Identical Proteins</span>
                                </div>
                            </div>
                            <div class="col text-end text-center my-auto">
                                <button class="btn btn-secondary" type="button" id="downloadButton">
                                    <a href="${url}" download="${id}_identical_proteins_ids.json" style="color: inherit; text-decoration: none;">Download JSON</a>
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
                            <div class="row justify-content-center mt-1">
                                <div class="col-md-12">
                                    <div style="max-height: 500px; overflow-y: auto;">
                                        <ul class="list-group">
                                            ${mapIdentifiers(result)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return listHTML;
    },

    asDataframe: function (result, id) {
        // Convert the result (dataframe) to CSV
        let csv = '';
        let keys = Object.keys(result[0]);
        csv += keys.join(',') + '\n';
        for (let i = 0; i < result.length; i++) {
            let values = keys.map(key => result[i][key]);
            csv += values.join(',') + '\n';
        }

        // Create a Blob object from the CSV
        let blob = new Blob([csv], { type: 'text/csv' });
        let url = URL.createObjectURL(blob);

        let tableHTML = `

            <div class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-xxxl-6 mb-3">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header py-3">
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-8 col-md-7 col-lg-8 pt-2">
                                <div class="iproteins-diagram detailed-view">
                                    <img src="/images/ncbiProteinGroups_logo.png" alt="ncbiProteinGroups_logo" class="iproteins-logo">
                                        <h5>${id}</h5>
                                </div>
                                <div class="iproteins-diagram compact-view" style="display: none;">
                                    <h5>${id}</h5>
                                    <span class="text-muted ms-2 text-start" style="font-size: 0.875em;">NCBI Identical Proteins</span>
                                </div>
                            </div>
                            <div class="col text-end text-center my-auto">
                                <button class="btn btn-secondary" type="button" id="downloadButton">
                                    <a href="${url}" download="${id}_identical_proteins_dataframe.csv" style="color: inherit; text-decoration: none;">Download CSV</a>
                                </button>      
                            </div>
                        </div>
                        <div class="row">
                            <div id="history-params" class="col-12">
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
        `;

        keys = ['Id', 'Source', 'Nucleotide.Accession', 'Start', 'Stop', 'Strand', 'Protein', 'Protein.Name', 'Organism', 'Strain', 'Assembly'];
        tableHTML += `
                        <div class="table-responsive mt-2" style="position: relative; max-height: 500px; overflow: auto; border: 2px solid #eee;">
                            <table class="table table-striped table-hover">
                                <thead style="position: sticky; top: 0; background-color: white">
                                        <tr style="box-shadow: 0 1px 0 #aaa;">
                                            <th>Id</th>
                                            <th>Source</th>
                                            <th>Nucleotide.Accession</th>
                                            <th>Start</th>
                                            <th>Stop</th>
                                            <th>Strand</th>
                                            <th>Protein</th>
                                            <th>Protein.Name</th>
                                            <th>Organism</th>
                                            <th>Strain</th>
                                            <th>Assembly</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${result.map(row => '<tr>' + keys.map(key => `<td>${row[key] || ''}</td>`).join('') + '</tr>').join('')}
                                    </tbody>
                            </table>
                        </div>    
                    </div>
                </div>
            </div>`;
        return tableHTML;
    },

};

export { identicalProteinRenderer };