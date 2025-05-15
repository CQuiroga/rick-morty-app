const { fetchCharacters } = require('../services/rickMortyService');
const cache = require('../utils/cache');

const resolvers = {
  characters: async ({ name, status, species, gender, origin }) => {
    const cacheKey = `characters:${name || ''}:${status || ''}:${species || ''}:${gender || ''}:${origin || ''}`;
    
    try {
      // Intenta obtener de caché
      const cachedData = await cache.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      // Si no hay en caché, llama al servicio
      const data = await fetchCharacters({ name, status, species, gender, origin });
      
      // Guarda en caché (1 hora)
      if (data) {
        await cache.set(cacheKey, JSON.stringify(data), 3600);
      }
      
      return data || [];
    } catch (error) {
      console.error('Resolver error:', error);
      throw new Error('Error fetching characters');
    }
  }
};

module.exports = resolvers;