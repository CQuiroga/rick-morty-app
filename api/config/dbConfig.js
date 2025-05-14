require('dotenv').config();

const parseConfig = (config) => {
  const parsed = {};
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'string' && value.startsWith('process.env.')) {
      const envVar = value.replace('process.env.', '');
      parsed[key] = process.env[envVar] || '';
    } else if (typeof value === 'object') {
      parsed[key] = parseConfig(value);
    } else {
      parsed[key] = value;
    }
  }
  return parsed;
};

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

module.exports = parseConfig(config);