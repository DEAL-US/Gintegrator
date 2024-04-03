"use strict";

const identicalProteinRenderer = {

    ipExplanations: function () {
        let examples = `
        AHA80958<br>
        76524190<br>
        WP_010896559<br>
        `;

        return `
        <p class="lead" style="font-size: 1.1em;">
            Provide a valid NCBI identifier to retrieve identical proteins identifiers as a list of them or as a more detailed table (dataframe). You can find identifier examples
            <span id='popoverIcon' style="text-decoration: underline;" tabindex="0" data-bs-toggle="popover"
                data-bs-trigger="manual" title="" data-bs-content='${examples}'>
                here</span>.
        </p>    
        `;
    },

    // HTML form with Bootstrap 4 classes
    ipForm: function () {
        return `
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <form id="identical-proteins-form">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="form-group">
                                            <label for="idInput">Enter ID:</label>
                                            <input type="text" id="idInput" name="idInput" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group ">
                                            <label for="formatSelect">Format:</label>
                                            <select id="formatSelect" name="formatSelect" class="form-control" required>
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
                </div>
            </div>
        </div>
    </div>
        <br>
    `;
    },

    asIDs: function (result) {
        // Create a Blob object from the result
        let blob = new Blob([JSON.stringify(result)], {type: 'application/json'});

        // Create a URL for the Blob object
        let url = URL.createObjectURL(blob);

        let listHTML = `
            <div class="row justify-content-center">
                <div class="col-md-6 text-end">
                    <button class="btn btn-secondary" type="button" id="downloadButton">
                        <a href="${url}" download="result.json" style="color: inherit; text-decoration: none;">Download JSON</a>
                    </button>      
                </div>
            </div>
        `;
        listHTML += `
            <div class="row justify-content-center mt-3">
                <div class="col-md-6">
                    <ul class="list-group">
                        ${result[0].map(id => `<li class="list-group-item">${id}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        listHTML += '<br>';
        return listHTML;
    },

    asDataframe: function (result) {
        // Convert the result (dataframe) to CSV
        let csv = '';
        let keys = Object.keys(result[0]);
        csv += keys.join(',') + '\n';
        for (let i = 0; i < result.length; i++) {
            let values = keys.map(key => result[i][key]);
            csv += values.join(',') + '\n';
        }

        // Create a Blob object from the CSV
        let blob = new Blob([csv], {type: 'text/csv'});
        let url = URL.createObjectURL(blob);

        let tableHTML = `
            <div class="row justify-content-center">
                <div class="col-md-6 text-end">
                    <button class="btn btn-secondary" type="button" id="downloadButton">
                        <a href="${url}" download="result.csv" style="color: inherit; text-decoration: none;">Download CSV</a>
                    </button>      
                </div>
            </div>
        `;

        keys = ['Id', 'Source', 'Nucleotide.Accession', 'Start', 'Stop', 'Strand', 'Protein', 'Protein.Name', 'Organism', 'Strain', 'Assembly'];
        tableHTML += '<div class="table-responsive mt-3"><table class="table">';
        tableHTML += `
        <thead><tr>
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
        </tr></thead>`;
        tableHTML += '<tbody>' + result.map(row => '<tr>' + keys.map(key => `<td>${row[key] || ''}</td>`).join('') + '</tr>').join('') + '</tbody>';
        tableHTML += '</table></div>';
        tableHTML += '<br>';
        return tableHTML;
    },

    noResultsFound: function() {
        return '<div class="alert alert-info" role="alert">No results found.</div>';
    }
};

export { identicalProteinRenderer };