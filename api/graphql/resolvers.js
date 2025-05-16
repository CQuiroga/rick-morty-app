const { fetchCharacters } = require('../services/rickMortyService');
const cache = require('../utils/cache');

const resolvers = {
  characters: async ({ name, status, species, gender, origin }) => {
    const cacheKey = `characters:${name || ''}:${status || ''}:${species || ''}:${gender || ''}:${origin || ''}`;
    
    try {
      // 1. Siempre consultar y guardar primero
      const apiCharacters = await fetchCharacters({ name, status, species, gender, origin });
      
      // 2. Devolver los datos formateados
      return apiCharacters.map(c => ({
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        gender: c.gender,
        origin: { name: c.origin?.name || 'Desconocido' },
        image: c.image
      }));
      
    } catch (error) {
      console.error('Resolver error:', error);
      throw new Error('Error fetching characters');
    }
  }
};

module.exports = resolvers;