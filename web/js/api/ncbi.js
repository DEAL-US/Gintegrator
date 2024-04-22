'use_strict';
    
    import { BASE_URL } from './common.js';
    
    const ncbiAPI ={
        getNCBIGene2NCBIProtein: async function(id, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiGene/${id}/ncbiProtein?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        getNCBIProtein2NCBIGene: async function(id, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiProtein/${id}/ncbiGene?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        getNCBIProtein2NCBINucleotide: async function(id, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiProtein/${id}/ncbiNucleotide?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        getNCBINucleotide2NCBIProtein: async function(id, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiNucleotide/${id}/ncbiProtein?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        getNCBIGene2NCBINucleotide: async function(id, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiGene/${id}/ncbiNucleotide?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        getNCBINucleotide2NCBIGene: async function(id, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiNucleotide/${id}/ncbiGene?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        getNCBIIdenticalProteins: async function(ncbiId, format = 'ids') {
            let response = await axios.get(`${BASE_URL}/identicalProteins/${ncbiId}?format=${format}`);
            return response.data;
        },
        getNCBIProtein2UniProt: async function(ncbiId, exhaustiveMapping = false, detailedMapping = false, byIdenticalProteins = true) {
            let response = await axios.get(`${BASE_URL}/ncbiProtein/${ncbiId}/uniprot?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}`);
            return response.data;
        },
        getNCBIGene2UniProt: async function(ncbiId, exhaustiveMapping = false, detailedMapping = false, byIdenticalProteins = true) {
            let response = await axios.get(`${BASE_URL}/ncbiGene/${ncbiId}/uniprot?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}`);
            return response.data;
        },
        getNCBINucleotide2UniProt: async function(ncbiId, exhaustiveMapping = false, detailedMapping = false, byIdenticalProteins = true) {
            let response = await axios.get(`${BASE_URL}/ncbiNucleotide/${ncbiId}/uniprot?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}`);
            return response.data;
        },

        getNCBIProtein2KEGG: async function(ncbiId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true, byIdenticalProteins = true) {
            let response = await axios.get(`${BASE_URL}/ncbiProtein/${ncbiId}/kegg?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}&bySimilarGenes=${bySimilarGenes}`);
            return response.data;
        },
        
        getNCBINucleotide2KEGG: async function(ncbiId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true, byIdenticalProteins = true) {
            let response = await axios.get(`${BASE_URL}/ncbiNucleotide/${ncbiId}/kegg?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}&bySimilarGenes=${bySimilarGenes}`);
            return response.data;
        },
        
        getNCBIGene2KEGG: async function(ncbiId, exhaustiveMapping = false, detailedMapping = false, bySimilarGenes = true, byIdenticalProteins = true) {
            let response = await axios.get(`${BASE_URL}/ncbiGene/${ncbiId}/kegg?exhaustiveMapping=${exhaustiveMapping}&detailedMapping=${detailedMapping}&byIdenticalProteins=${byIdenticalProteins}&bySimilarGenes=${bySimilarGenes}`);
            return response.data;
        },
        
        getNCBIProtein2CARD: async function(ncbiId, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiProtein/${ncbiId}/card?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        
        getNCBINucleotide2CARD: async function(ncbiId, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiNucleotide/${ncbiId}/card?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        },
        
        getNCBIGene2CARD: async function(ncbiId, exhaustiveMapping = false) {
            let response = await axios.get(`${BASE_URL}/ncbiGene/${ncbiId}/card?exhaustiveMapping=${exhaustiveMapping}`);
            return response.data;
        }

    }
    export {ncbiAPI};