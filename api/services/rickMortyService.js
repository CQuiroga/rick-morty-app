const axios = require('axios');
const { Character } = require('../models');
const { cache } = require('../utils/cache');

const API_URL = 'https://rickandmortyapi.com/api/character';

const fetchCharacters = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    return null;
  }
};

const syncCharacters = async () => {
  try {
    const characters = await fetchCharacters();
    const limitedCharacters = characters.slice(0, 15);
    
    for (const char of limitedCharacters) {
      await Character.upsert({
        apiId: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        type: char.type,
        gender: char.gender,
        originName: char.origin.name,
        originUrl: char.origin.url,
        locationName: char.location.name,
        locationUrl: char.location.url,
        image: char.image,
        url: char.url
      });
    }
    
    console.log('Database synced with Rick and Morty API');
  } catch (error) {
    console.error('Error syncing characters:', error);
  }
};

module.exports = {
  fetchCharacters,
  fetchCharacterById,
  syncCharacters
};