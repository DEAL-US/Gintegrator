'use_strict';

import { BASE_URL } from './common.js';

const keggAPI = {

    getKEGG2UniProt: async function (keggId, exhaustiveMapping = false) {
        let response = await axios.get(`${BASE_URL}/kegg/${keggId}/uniprot?exhaustiveMapping=${exhaustiveMapping}`);
        return response.data;
    },
    getKEGG2NCBIProtein: async function (keggId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/kegg/${keggId}/ncbiProtein?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    },
    getKEGG2NCBINucleotide: async function (keggId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/kegg/${keggId}/ncbiNucleotide?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    },
    getKEGG2NCBIGene: async function (keggId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/kegg/${keggId}/ncbiGene?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    },
    getKEGG2CARD: async function (keggId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/kegg/${keggId}/card?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    }

}
export { keggAPI };