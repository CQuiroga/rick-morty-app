const axios = require('axios');
const { Character } = require('../models');

const API_URL = 'https://rickandmortyapi.com/api/character';

const fetchCharacters = async (filters) => {
  try {
    const { name, status, species, gender, origin } = filters || {};
    
    // 1. Parámetros de consulta a la API
    const apiParams = {
      name: name || undefined,
      status: status || undefined,
      species: species || undefined,
      gender: gender || undefined
    };

    // Limpiar parámetros undefined
    Object.keys(apiParams).forEach(key => {
      if (apiParams[key] === undefined) delete apiParams[key];
    });

    // 2. Consultar a la API con manejo seguro
    let response;
    try {
      response = await axios.get(API_URL, { 
        params: apiParams,
        validateStatus: (status) => status < 500
      });
    } catch (apiError) {
      console.error('Error en la petición a la API:', apiError.message);
      return [];
    }

    // 3. Validar estructura de la respuesta
    let characters = Array.isArray(response?.data?.results) 
      ? response.data.results 
      : [];

    // 4. Filtrar por origen si existe
    if (origin && typeof origin === 'string') {
      const originLower = origin.trim().toLowerCase();
      characters = characters.filter(c => {
        const originName = c?.origin?.name || '';
        return originName.toLowerCase().includes(originLower);
      });
    }

    // 5. Guardar en base de datos con validación estricta
    if (characters.length > 0) {
      console.log(`Procesando ${characters.length} personajes para guardar...`);
      
      for (const char of characters) {
        try {
          // Validación mínima del personaje
          if (!char?.id || !char.name) {
            console.warn('Personaje inválido, omitiendo:', char);
            continue;
          }

          // Datos para guardar
          const charData = {
            apiId: char.id,
            name: char.name,
            status: char.status || 'unknown',
            species: char.species || 'unknown',
            gender: char.gender || 'unknown',
            originName: char.origin?.name || 'Desconocido',
            originUrl: char.origin?.url || '',
            image: char.image || '',
            type: char.type || '',
            locationName: char.location?.name || 'Desconocido',
            locationUrl: char.location?.url || '',
            url: char.url || ''
          };

          // Buscar o crear
          const [instance, created] = await Character.findOrCreate({
            where: { apiId: char.id },
            defaults: charData
          }).catch(error => {
            console.error(`Error en findOrCreate para ${char.id}:`, error);
            throw error; // Opcional: decide si quieres relanzar el error
          });

          // Log detallado
          if (created) {
            console.log(`✅ Creado: ${charData.name} (ID: ${charData.apiId})`);
          } else {
            console.log(`⚡ Actualizado: ${charData.name} (ID: ${charData.apiId})`);
            await instance.update(charData);
          }

        } catch (dbError) {
          console.error(`❌ Error guardando ${char.id}:`, dbError.message);
          if (dbError.errors) {
            dbError.errors.forEach(e => console.error(`   → ${e.type}: ${e.message}`));
          }
        }
      }
    }

    return characters;

  } catch (error) {
    console.error('🔥 Error crítico en fetchCharacters:', error);
    return [];
  }
};

module.exports = { fetchCharacters };