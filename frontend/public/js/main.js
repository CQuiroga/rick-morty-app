document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '<p class="text-center py-8">Buscando personajes...</p>';

  // Obtener valores del formulario
  const formData = new FormData(e.target);
  const searchParams = {
    name: formData.get('name') || undefined,
    status: formData.get('status') || undefined,
    species: formData.get('species') || undefined,
    gender: formData.get('gender') || undefined,
    origin: formData.get('origin') || undefined
  };

  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query SearchCharacters(
            $name: String
            $status: String
            $species: String
            $gender: String
            $origin: String
          ) {
            characters(
              name: $name
              status: $status
              species: $species
              gender: $gender
              origin: $origin
            ) {
              id
              name
              status
              species
              gender
              origin {
                name
              }
              image
            }
          }
        `,
        variables: searchParams // Cambiado de 'filters' a 'searchParams'
      })
    });

    
    
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }
    
    const { data, errors } = await response.json();
    console.log('Respuesta recibida:', data.characters);

    if (errors) {
      console.error('Errores GraphQL:', errors);
      throw new Error(errors[0].message);
    }

    displayResults(data.characters);
  } catch (error) {
    resultsContainer.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error al buscar personajes: ${error.message}</p>
        <p class="text-sm mt-2">Verifica la consola para más detalles</p>
      </div>
    `;
    console.error('Error en la búsqueda:', error);
  }
});

function displayResults(characters) {
  const resultsContainer = document.getElementById('results');
  
  if (!characters || characters.length === 0) {
    resultsContainer.innerHTML = '<p class="text-center py-8">No se encontraron personajes con esos filtros</p>';
    return;
  }

  resultsContainer.innerHTML = characters.map(character => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <img src="${character.image}" alt="${character.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${character.name}</h3>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <p><span class="font-semibold">Estado:</span> ${character.status}</p>
          <p><span class="font-semibold">Especie:</span> ${character.species}</p>
          <p><span class="font-semibold">Género:</span> ${character.gender}</p>
          <p><span class="font-semibold">Origen:</span> ${character.origin?.name || 'Desconocido'}</p>
        </div>
      </div>
    </div>
  `).join('');
}