"use strict";

const mapperRenderer = {

    mapperExplanations: function () {
        return `
        <p class="lead" style="font-size: 1.1em;">
            First, choose the databases from which you want to translate and to which you want to translate. Then, provide valid identifiers of the 'From' database or a CSV file with them.
        </p>
        `;
    },

    // HTML form with Bootstrap 4 classes
    mapperForm: function () {
        return `
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-9 col-xl-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <form id="mapper-form">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="fromDbSelect">From:</label>
                                            <select id="fromDbSelect" name="fromDbSelect" class="form-control" required>
                                                <option selected disabled value="default">Select a database</option>
                                                <option value="card">CARD</option>
                                                <option value="ncbiProtein">NCBI Protein</option>
                                                <option value="ncbiGene">NCBI Gene</option>
                                                <option value="ncbiNucleotide">NCBI Nucleotide</option>
                                                <option value="uniprot">UniProt</option>
                                                <option value="kegg">KEGG</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group mt-xs-3">
                                            <label for="toDbSelect">To:</label>
                                            <select id="toDbSelect" name="toDbSelect" class="form-control" required>
                                                <option selected disabled value="default">Select a database</option>
                                                <option value="card">CARD</option>
                                                <option value="ncbiProtein">NCBI Protein</option>
                                                <option value="ncbiGene">NCBI Gene</option>
                                                <option value="ncbiNucleotide">NCBI Nucleotide</option>
                                                <option value="uniprot">UniProt</option>
                                                <option value="kegg">KEGG</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="idInput" id="idInputLabel">
                                                Enter ID:
                                            </label>
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
                        <div id="cvSwitchDiv"></div>
                </div>
            </div>
        </div>
    </div>
        <br>
        `;
    },

    asIDs: function (result, id, fromDb, toDb) {
        // Create a Blob object from the result
        let blob = new Blob([JSON.stringify(result)], { type: 'application/json' });
    
        // Create a URL for the Blob object
        let url = URL.createObjectURL(blob);
    
        // Create a dictionary of the url for the toDb
        let urlDict = {
            'card': '',
            'ncbiProtein': 'https://www.ncbi.nlm.nih.gov/protein/',
            'ncbiGene': 'https://www.ncbi.nlm.nih.gov/gene/',
            'ncbiNucleotide': 'https://www.ncbi.nlm.nih.gov/nuccore/',
            'uniprot': 'https://www.uniprot.org/uniprotkb/',
            'kegg': 'https://www.genome.jp/entry/'
        };

        let dbDict = {
            'card': 'CARD',
            'ncbiProtein': 'NCBI Protein',
            'ncbiGene': 'NCBI Gene',
            'ncbiNucleotide': 'NCBI Nucleotide',
            'uniprot': 'UniProt',
            'kegg': 'KEGG'
        };
    
        let listHTML = `
            <div class="col-12 col-md-12 col-lg-6 col-xl-5 col-xxl-5 col-xxxl-4 mb-3">
                <div class="card mt-2 mx-auto bg-light">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-md-7 col-sm-7 pt-2">
                                <div class="translation-diagram detailed-view">
                                    <img src="/images/${fromDb}_logo.png" alt="${fromDb} logo" class="translation-logo">
                                    <div class="translation-center">
                                        <span class="translation-id">${id}</span>
                                        <span class="translation-arrow"></span>
                                    </div>
                                    <img src="/images/${toDb}_logo.png" alt="${toDb} logo" class="translation-logo">
                                </div>
                                <div class="translation-diagram compact-view" style="display: none;">
                                    <span class="translation-id">${id}</span>
                                    <span class="translation-arrow-short mb-3"></span>
                                    <span class="translation-id">${dbDict[toDb]}</span>
                                </div>
                            </div>
                            <div class="col text-end text-center my-auto">
                                <button class="btn btn-secondary" type="button" id="downloadButton">
                                    <a href="${url}" download="${id}_${fromDb}_to_${toDb}.json" style="color: inherit; text-decoration: none;">Download JSON</a>
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
    
        // Function to map identifiers to HTML list items
        function mapIdentifiers(identifiers, toDb, urlDict) {
            if (toDb === 'card') {
                return identifiers.map(idx => `<li class="list-group-item">${idx.trim()}</li>`).join('');
            } else {
                return identifiers.map(idx => `
                <li class="list-group-item">${idx.trim()} 
                    <a href="${urlDict[toDb]}${idx.trim()}" target="_blank" style="font-size: 0.6em">
                        View in Database <i class="fa fa-external-link"></i>
                    </a>
                </li>`).join('');
            }
        }
    
        if (Array.isArray(result)) {
            if (typeof result[0] === 'string') {
                // If result is an array of identifiers
                let identifiers = result;
                listHTML += `
                    <div class="row justify-content-center mt-1">
                        <div class="col-md-12">
                            <div style="max-height: 500px; overflow-y: auto;">
                                <ul class="list-group">
                                    ${mapIdentifiers(identifiers, toDb, urlDict)}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            } else if (Array.isArray(result[0])) {
                // If result is an array of arrays of identifiers
                result.forEach(identifiers => {
                    listHTML += `
                        <div class="row justify-content-center mt-1">
                            <div class="col-md-12">
                                <div style="max-height: 500px; overflow-y: auto;">
                                    <ul class="list-group">
                                        ${mapIdentifiers(identifiers, toDb, urlDict)}
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
                            <div class="row justify-content-center mt-1">
                                <div class="col-md-12">
                                    <h5>${clusterName}</h5>
                                    <div style="max-height: 500px; overflow-y: auto;">
                                        <ul class="list-group">
                                            ${mapIdentifiers(identifiers, toDb, urlDict)}
                                        </ul>
                                    </div>
                                </div>
                            </div><br>
                        `;
                    }
                });
            }
        } else if (typeof result === 'object') {
            // If result is an object with keys and lists of identifiers as values
            for (let clusterName in result) {
                let identifiers = result[clusterName];
                listHTML += `
                    <div class="row justify-content-center mt-1">
                        <div class="col-md-12">
                            <h5>${clusterName}</h5>
                            <div style="max-height: 500px; overflow-y: auto;">
                                <ul class="list-group">
                                    ${mapIdentifiers(identifiers, toDb, urlDict)}
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
                </div>`;
        return listHTML;
    }
};

export { mapperRenderer };