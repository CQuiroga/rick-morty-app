const { syncCharacters } = require('../services/rickMortyService');

(async () => {
  try {
    await syncCharacters();
    process.exit(0);
  } catch (error) {
    console.error('Error in sync script:', error);
    process.exit(1);
  }
})();