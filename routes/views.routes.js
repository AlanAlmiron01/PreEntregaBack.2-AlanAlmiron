import { Router } from 'express';
import ProductManager from '../services/productManager.js';

const router = Router();
const productManager = new ProductManager();

// Homepage: GET /
router.get('/', async (req, res, next) => {
  try {
    const products = await productManager.read();
    res.render('index', { products });
  } catch (error) {
    next(error);
  }
});

// Real-time products view: GET /products/real
router.get('/products/real', async (req, res, next) => {
  try {
    const products = await productManager.read();
    res.render('products_real', { products });
  } catch (error) {
    next(error);
  }
});

// Product detail view: GET /products/:pid
router.get('/products/:pid', async (req, res, next) => {
  try {
    const product = await productManager.readOne(req.params.pid);
    if (!product) return res.status(404).send('Product not found');
    res.render('product_detail', { product });
  } catch (error) {
    next(error);
  }
});

// Cart view: GET /cart
router.get('/cart', (req, res) => {
  res.render('cart');
});

export default router;
