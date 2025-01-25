const express = require('express');
const productsRouter = require('./routes/products.routes');
const pathHandler = require('./middlewares/pathHandler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde "public"
app.use(express.static('public'));

// Rutas de la API
app.use('/api/products', productsRouter);

// Middleware para rutas no encontradas
app.use(pathHandler);

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;
