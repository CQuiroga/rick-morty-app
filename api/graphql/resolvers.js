// api/graphql/resolvers.js
const cache = require('../utils/cache');
const { fetchCharacters } = require('../services/rickMortyService');

const resolvers = {
  characters: async ({ name, status }) => {
    const cacheKey = `characters:${name || ''}:${status || ''}`;
    
    try {
      // Intenta obtener de cache
      const cached = await cache.get(cacheKey);
      if (cached) {
        console.log('Cache hit');
        return JSON.parse(cached);
      }

      // Si no hay cache, llama a la API
      const data = await fetchCharacters({ name, status });
      
      // Guarda en cache (1 hora)
      if (data) {
        await cache.set(cacheKey, JSON.stringify(data));
      }
      
      return data || [];
    } catch (error) {
      console.error('Resolver error:', error);
      throw new Error('Error fetching characters');
    }
  }
};

module.exports = resolvers;