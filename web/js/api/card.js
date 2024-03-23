'use_strict';

import { BASE_URL } from './common.js';

const cardAPI = {

    getCARD2NCBIProtein: async function (cardId) {
        let response = await axios.get(`${BASE_URL}/card/${cardId}/ncbiProtein`);
        return response.data;
    },
    getCARD2NCBINucleotide: async function (cardId) {
        let response = await axios.get(`${BASE_URL}/card/${cardId}/ncbiNucleotide`);
        return response.data;
    },
    getCARD2NCBIGene: async function (cardId, exhaustiveMapping = false) {
        let response = await axios.get(`${BASE_URL}/card/${cardId}/ncbiGene?exhaustiveMapping=${exhaustiveMapping}`);
        return response.data;
    },
    getCARD2UniProt: async function (cardId, exhaustiveMapping = false, detailedMapping = false) {
        let response = await axios.get(`${BASE_URL}/card/${cardId}/uniprot?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}`);
        return response.data;
    },
    getCARD2KEGG: async function (cardId, exhaustiveMapping = false, detailedMapping = false, byIdenticalProteins = true, bySimilarGenes = true) {
        let response = await axios.get(`${BASE_URL}/card/${cardId}/kegg?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}&bySimilarGenes=${bySimilarGenes}`);
        return response.data;
    }
}
export { cardAPI };