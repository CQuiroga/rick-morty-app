const { Sequelize } = require('sequelize');
const config = require('../config/dbConfig');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: config.pool || {}
  }
);

module.exports = sequelize;