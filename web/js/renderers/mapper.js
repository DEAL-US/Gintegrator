"use strict";

const mapperRenderer = {

    mapperExplanations: function () {
        let examples = `
        <b>CARD</b>: <span class="clipb-span">ARO:3002535</span>; <span class="clipb-span">ARO:3000938</span>
        <br>
        <b>NCBI Protein</b>: <span class="clipb-span">CAA79696</span>; <span class="clipb-span">76524190</span>; <span class="clipb-span">WP_010896559.1</span>
        <br>
        <b>NCBI Gene</b>: <span class="clipb-span">76524190</span>; <span class="clipb-span">3510143</span>
        <br>
        <b>NCBI Nucleotide</b>: <span class="clipb-span">AY536519</span>; <span class="clipb-span">JQ394987</span>; <span class="clipb-span">Z21488</span>
        <br>
        <b>UniProt</b>: <span class="clipb-span">G0L217</span>; <span class="clipb-span">G9JVE6</span>; <span class="clipb-span">Q6R7P5</span>
        <br>
        <b>KEGG</b>: <span class="clipb-span">ag:ACC85616</span>; <span class="clipb-span">aag:5579347</span>; <span class="clipb-span">llo:LLO_2673</span>
        `;

        let deprecated = `
        <span class="clipb-span"><b>CARD</b>: ARO:3002535; ARO:3000938
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        
        <span class="clipb-span"><b>NCBI Protein</b>: CAA79696; 76524190; WP_010896559.1 
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        
        <span class="clipb-span"><b>NCBI Gene</b>: 76524190; 3510143
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>

        <span class="clipb-span"><b>NCBI Nucleotide</b>: AY536519; JQ394987; Z21488 
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>

        <span class="clipb-span"><b>UniProt</b>: G0L217; G9JVE6; Q6R7P5 
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>

        <span class="clipb-span"><b>KEGG</b>: ag:ACC85616; aag:5579347; llo:LLO_2673 
        <a href="#" class="clipb"><i class="fa fa-clone fa-inverse" aria-hidden="true"></i></a></span>
        `;

        return `
        <p class="lead" style="font-size: 1.1em;">
            Provide a valid identifier to translate between the selected databases with 'From' and 'To'
            dropdowns. You can find identifier examples
            <span id='popoverIcon' style="text-decoration: underline; cursor: pointer;" tabindex="0" data-bs-toggle="popover"
                data-bs-trigger="manual" title="" data-bs-content='${examples}'>
                here</span>.
        </p>    
        `;
    },

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
                                            <label for="idInput">
                                                Enter ID:
                                            </label>
                                            <input type="text" id="idInput" name="idInput" class="form-control" placeholder="identifier1; identifier2; identifier3..." required>
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
                                            title="If activated, retrieves all possible translations (may take some time if combined with Similar Genes and Identical Proteins)" class="info-icon">
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

    asIDs: function (result, id) {
        // Create a Blob object from the result
        let blob = new Blob([JSON.stringify(result)], { type: 'application/json' });

        // Create a URL for the Blob object
        let url = URL.createObjectURL(blob);

        let listHTML = `
        <div class="row justify-content-center">
            <div class="col-lg-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6 text-center pt-2">
                                    <h5>${id}</h5>
                                </div>
                                <div class="col-md-6 text-end my-auto">
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
                        <div class="col-md-12">
                            <div style="max-height: 500px; overflow-y: auto;">
                                <ul class="list-group">
                                    ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            } else if (Array.isArray(result[0])) {
                // If result is an array of arrays of identifiers
                result.forEach(identifiers => {
                    listHTML += `
                        <div class="row justify-content-center mt-3">
                            <div class="col-md-12">
                                <div style="max-height: 500px; overflow-y: auto;">
                                    <ul class="list-group">
                                        ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                                    </ul>
                                </div>
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
                                <div class="col-md-12">
                                    <h5>${clusterName}</h5>
                                    <div style="max-height: 500px; overflow-y: auto;">
                                        <ul class="list-group">
                                            ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                                        </ul>
                                    </div>
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
                        <div class="col-md-12">
                            <h5>${clusterName}</h5>blabla
                            <div style="max-height: 500px; overflow-y: auto;">
                                <ul class="list-group">
                                    ${identifiers.map(id => `<li class="list-group-item">${id.trim()}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        listHTML += `
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <br>`;
        return listHTML;
    }
};

export { mapperRenderer };