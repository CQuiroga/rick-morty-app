const cron = require('node-cron');
const { syncCharacters } = require('./rickMortyService');

const setupCronJobs = () => {
  // Ejecutar cada 12 horas
  cron.schedule('0 */12 * * *', () => {
    console.log('Running scheduled character sync...');
    syncCharacters();
  });
};

module.exports = { setupCronJobs };