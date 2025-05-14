// api/scripts/testRedis.js
require('dotenv').config();
const { get, set, client } = require('../utils/cache');

(async () => {
  try {
    // Test de conexión
    await client.connect();
    console.log('✅ Connected to Redis');

    // Test de escritura
    await set('test', 'works', 'EX', 10);
    console.log('✅ Data set in Redis');

    // Test de lectura
    const value = await get('test');
    console.log('✅ Retrieved value:', value);

    process.exit(0);
  } catch (error) {
    console.error('❌ Redis test failed:', error);
    process.exit(1);
  }
})();