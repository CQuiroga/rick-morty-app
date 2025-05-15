const express = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const favicon = require('serve-favicon');

// Crear aplicación Express
const app = express();

app.use(favicon(path.join('frontend/public', 'favicon.ico')));

// Configuración básica
app.use(cors(
  {
  origin: 'http://localhost:3000',
  credentials: true
}
));
app.use(express.json());

// Middlewares
const { loggingMiddleware } = require('./middlewares/logging');
app.use(loggingMiddleware);

// GraphQL
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: require('./graphql/resolvers'),
  graphiql: true
}));


// Configuración de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../frontend/views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Rick and Morty Explorer' });
});

module.exports = app;