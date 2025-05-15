const axios = require('axios');

const API_URL = 'https://rickandmortyapi.com/api/character';

const fetchCharacters = async ({ name, status, species, gender, origin }) => {
  try {
    // Parámetros que soporta la API directamente
    const apiParams = {
      name,
      status,
      species,
      gender
    };

    // Eliminar parámetros undefined
    Object.keys(apiParams).forEach(key => apiParams[key] === undefined && delete apiParams[key]);

    // Primera búsqueda con filtros API
    const response = await axios.get(API_URL, { params: apiParams });
    let characters = response.data.results || [];

    // Filtrado adicional por origen si existe
    if (origin) {
      const originLower = origin.toLowerCase();
      characters = characters.filter(character => 
        character.origin?.name?.toLowerCase().includes(originLower)
      );
    }

    return characters;
  } catch (error) {
    if (error.response?.status === 404) {
      return []; // No hay resultados
    }
    console.error('Error fetching characters:', error);
    throw error;
  }
};

module.exports = {
  fetchCharacters
};