document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const resultsContainer = document.getElementById('results');

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mostrar estado de carga
    resultsContainer.innerHTML = '<p class="text-center">Buscando personajes...</p>';

    const formData = new FormData(searchForm);
    const params = {
      name: formData.get('name'),
      status: formData.get('status')
    };

    try {
      // 1. Primero verifica que la petición se está haciendo
      console.log('Enviando consulta con:', params);
      
      const response = await fetch('./graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query SearchCharacters($name: String, $status: String) {
              characters(name: $name, status: $status) {
                id
                name
                status
                species
                image
              }
            }
          `,
          variables: params
        })
      });

      // 2. Verifica la respuesta del servidor
      console.log('Respuesta recibida:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data, errors } = await response.json();
      
      // 3. Verifica posibles errores de GraphQL
      if (errors) {
        console.error('Errores GraphQL:', errors);
        resultsContainer.innerHTML = `<p class="text-red-500">Error: ${errors[0].message}</p>`;
        return;
      }

      // 4. Muestra los datos recibidos en consola
      console.log('Datos recibidos:', data);
      
      if (data.characters.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No se encontraron personajes</p>';
        return;
      }

      // Renderizar resultados
      resultsContainer.innerHTML = data.characters.map(character => `
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <img src="${character.image}" alt="${character.name}" class="w-full h-48 object-cover mb-2 rounded">
          <h3 class="font-bold text-lg">${character.name}</h3>
          <p><span class="font-semibold">Estado:</span> ${character.status}</p>
          <p><span class="font-semibold">Especie:</span> ${character.species}</p>
        </div>
      `).join('');

    } catch (error) {
      console.error('Error en la búsqueda:', error);
      resultsContainer.innerHTML = `
        <p class="text-red-500">Error al buscar personajes: ${error.message}</p>
        <p class="text-sm text-gray-500">Revisa la consola para más detalles</p>
      `;
    }
  });
});