// api/server.js
require('dotenv').config();
const app = require('./app'); // Importar después de configurar dotenv
const { client: redisClient } = require('./utils/cache');
const sequelize = require('./models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sincronización de modelos (solo en desarrollo)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Database models synchronized');
    }

    // Configuración de Redis
    redisClient.on('connect', () => {
      console.log('🔴 Connected to Redis');
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔮 GraphQL playground at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('🔥 Server startup error:', error);
    process.exit(1);
  }
};

// Manejo de cierre limpio
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  try {
    await sequelize.close();
    redisClient.quit();
    console.log('✅ Resources released');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});

startServer();