
const express = require('express');
const app = express();

// Configuraciones básicas
app.use(require('cors')());
app.use(express.json());

module.exports = app;