"use strict";

import { parseHTML } from '../utils/parseHTML.js';

const mapperRenderer = {

    // HTML form with Bootstrap 4 classes
    mapperForm: function () {
        return `
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <form id="mapper-form">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="idInput">Enter ID:</label>
                                            <input type="text" id="idInput" name="idInput" class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="fromDbSelect" class="mt-3">From:</label>
                                            <select id="fromDbSelect" name="fromDbSelect" class="form-control" required>
                                                <option value="card" selected>CARD</option>
                                                <option value="ncbiProtein">NCBI Protein</option>
                                                <option value="ncbiGene">NCBI Gene</option>
                                                <option value="ncbiNucleotide">NCBI Nucleotide</option>
                                                <option value="uniprot">UniProt</option>
                                                <option value="kegg">KEGG</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="toDbSelect" class="mt-3">To:</label>
                                            <select id="toDbSelect" name="toDbSelect" class="form-control" required>
                                                <option value="card">CARD</option>
                                                <option value="ncbiProtein" selected>NCBI Protein</option>
                                                <option value="ncbiGene">NCBI Gene</option>
                                                <option value="ncbiNucleotide">NCBI Nucleotide</option>
                                                <option value="uniprot">UniProt</option>
                                                <option value="kegg">KEGG</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-6">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" value="" id="exhaustiveMapping" name="exhaustiveMapping">
                                            <label class="form-check-label" for="exhaustiveMapping">Exhaustive Mapping</label>
                                            <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                            title="If activated, retrieves all possible translations" class="info-icon">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" value="" id="detailedMapping"
                                                name="detailedMapping">
                                            <label class="form-check-label" for="detailedMapping">Detailed
                                                Mapping</label>
                                                <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                                title="If activated, details the origin of the translated IDs,
                                                dividing them in DT, if it is a Direct Translation, or 100%,
                                                90% or 50%, if it has been retrieved through any of the
                                                identical gene clusters" class="info-icon">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-1">
                                    <div class="col-md-6">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" value="" id="similarGenes"
                                                name="similarGenes">
                                            <label class="form-check-label" for="similarGenes">Similar Genes</label>
                                            <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                            title="If activated, translates also through similar UniProt genes (100%, 90% or
                                                50% of identity). It may take a long time, only advised
                                                if there is not a direct translation possible" class="info-icon">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" value="" id="identicalProteins"
                                                name="identicalProteins">
                                            <label class="form-check-label" for="identicalProteins">Identical
                                                Proteins</label>
                                            <img src="images/info-circle.svg" data-bs-toggle="tooltip" data-bs-placement="right" 
                                            title="If activated, translate also through NCBI Identical Proteins, altough it means higher translation time" class="info-icon">
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

        if (Array.isArray(result)) {
            if (typeof result[0] === 'string') {
                // If result is an array of identifiers
                let identifiers = result;
                listHTML += `
                    <div class="row justify-content-center mt-3">
                        <div class="col-md-6">
                            <ul class="list-group">
                                ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            } else if (Array.isArray(result[0])) {
                // If result is an array of arrays of identifiers
                result.forEach(identifiers => {
                    listHTML += `
                        <div class="row justify-content-center mt-3">
                            <div class="col-md-6">
                                <ul class="list-group">
                                    ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                });
            } else if (typeof result[0] === 'object') {
                // If result is an array of objects with keys and lists of identifiers as values
                result.forEach(obj => {
                    for (let clusterName in obj) {
                        let identifiers = obj[clusterName];
                        listHTML += `
                            <div class="row justify-content-center mt-3">
                                <div class="col-md-6">
                                    <h5>${clusterName}</h5>
                                    <ul class="list-group">
                                        ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `;
                    }
                });
            }
        } else if (typeof result === 'object') {
            // If result is an object with keys and lists of identifiers as values
            for (let clusterName in result) {
                let identifiers = result[clusterName];
                listHTML += `
                    <div class="row justify-content-center mt-3">
                        <div class="col-md-6">
                            <h5>${clusterName}</h5>
                            <ul class="list-group">
                                ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }
        }
        listHTML += '<br><br>';
        return listHTML;
    }
};

export { mapperRenderer };