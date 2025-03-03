// routes/api/products.routes.js
import { Router } from 'express';
import Product from '../../models/product.model.js';

const router = Router();

// Crear producto (esto se puede proteger con un middleware si solo admins pueden hacerlo)
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ product: newProduct });
  } catch (err) {
    next(err);
  }
});

// Obtener productos (con filtro y paginación)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 40, category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ products });
  } catch (err) {
    next(err);
  }
});

// Obtener producto por id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
});

// Actualizar producto
router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ product: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// Eliminar producto
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ product: deletedProduct });
  } catch (err) {
    next(err);
  }
});

export default router;
