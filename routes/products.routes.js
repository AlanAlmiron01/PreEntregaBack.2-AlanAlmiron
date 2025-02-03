import express from 'express';
import ProductManager from '../services/productManager.js';
import validateProduct from '../middlewares/validateProduct.js';

const router = express.Router();
const productManager = new ProductManager();

// Create product (POST /api/products)
router.post('/', validateProduct, async (req, res, next) => {
  try {
    const newId = await productManager.create(req.body);
    res.status(201).json({ statusCode: 201, response: newId });
  } catch (error) {
    next(error);
  }
});

// Read all products (GET /api/products)
router.get('/', async (req, res, next) => {
  try {
    const products = await productManager.read();
    res.status(200).json({ statusCode: 200, response: products });
  } catch (error) {
    next(error);
  }
});

// Read one product (GET /api/products/:pid)
router.get('/:pid', async (req, res, next) => {
  try {
    const product = await productManager.readOne(req.params.pid);
    if (!product) return res.status(404).json({ statusCode: 404, error: 'Product not found' });
    res.status(200).json({ statusCode: 200, response: product });
  } catch (error) {
    next(error);
  }
});

// Update product (PUT /api/products/:pid)
router.put('/:pid', validateProduct, async (req, res, next) => {
  try {
    const updatedProduct = await productManager.update(req.params.pid, req.body);
    if (!updatedProduct) return res.status(404).json({ statusCode: 404, error: 'Product not found' });
    res.status(200).json({ statusCode: 200, response: updatedProduct });
  } catch (error) {
    next(error);
  }
});

// Delete product (DELETE /api/products/:pid)
router.delete('/:pid', async (req, res, next) => {
  try {
    const deletedId = await productManager.destroy(req.params.pid);
    if (!deletedId) return res.status(404).json({ statusCode: 404, error: 'Product not found' });
    res.status(200).json({ statusCode: 200, response: deletedId });
  } catch (error) {
    next(error);
  }
});

export default router;
