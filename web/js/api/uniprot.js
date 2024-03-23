'use_strict';

import { BASE_URL } from './common.js';

const uniprotAPI = {

    getUniProtSimilarGenes: async function (upId, clusterIdentity = '1.0', clusterNames = false) {
        let response = await axios.get(`${BASE_URL}/similarGenes/${upId}?clusterIdentity=${clusterIdentity}&clusterNames=${clusterNames}`);
        return response.data;
    },
    getUniProt2KEGG: async function (upId, exhaustiveMapping = false, bySimilarGenes = true, detailedMapping = false) {
        let response = await axios.get(`${BASE_URL}/uniprot/${upId}/kegg?exhaustiveMapping=${exhaustiveMapping}&bySimilarGenes=${bySimilarGenes}&detailedMapping=${detailedMapping}`);
        return response.data;
    },
    getUniProt2NCBIProtein: async function (upId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/uniprot/${upId}/ncbiProtein?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    },
    getUniProt2NCBINucleotide: async function (upId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/uniprot/${upId}/ncbiNucleotide?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    },
    getUniProt2NCBIGene: async function (upId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/uniprot/${upId}/ncbiGene?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    },
    getUniProt2CARD: async function (upId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/uniprot/${upId}/card?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    }

}
export { uniprotAPI };