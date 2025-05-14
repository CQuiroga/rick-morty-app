const { createClient } = require('redis');

class RedisCache {
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    
    this.client.on('error', (err) => console.error('Redis Client Error', err));
    
    // Conecta al iniciar
    this.connect();
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log('✅ Connected to Redis');
    }
  }

  async get(key) {
    try {
      await this.connect();
      return await this.client.get(key);
    } catch (err) {
      console.error('Redis get error:', err);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      await this.connect();
      return await this.client.set(key, value, { EX: ttl });
    } catch (err) {
      console.error('Redis set error:', err);
      return 'OK';
    }
  }
}

module.exports = new RedisCache();