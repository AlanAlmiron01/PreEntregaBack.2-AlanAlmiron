import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import productsRoutes from './routes/api/products.routes.js';
import cartsRoutes from './routes/api/carts.routes.js';
import usersRoutes from './routes/api/users.routes.js';
import viewsRoutes from './routes/views.routes.js';
import pathHandler from './middlewares/pathHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Configurar EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas de la API
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/users', usersRoutes);

// Rutas de vistas
app.use('/', viewsRoutes);

app.use('*', pathHandler);
app.use(errorHandler);

export default app;
