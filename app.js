import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import usersRoutes from './routes/users.routes.js';
import pathHandler from './middlewares/pathHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/users', usersRoutes);

app.use(pathHandler);
app.use(errorHandler);

export default app;
