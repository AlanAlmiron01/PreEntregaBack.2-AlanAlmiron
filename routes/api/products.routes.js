import { Router } from 'express';
import ProductManager from '../../services/productManager.js';
import validateProduct from '../../middlewares/validateProduct.js';

const router = Router();
const productManager = new ProductManager();

router.post('/', validateProduct, async (req, res, next) => {
  try {
    const newProduct = await productManager.create(req.body);
    // Emitir evento en tiempo real para actualizar la lista de productos
    const io = req.app.get('socketio');
    io.emit('newProduct', newProduct);
    res.status(201).json({ statusCode: 201, response: newProduct });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const products = await productManager.read();
    res.json({ statusCode: 200, response: products });
  } catch (error) {
    next(error);
  }
});

router.get('/:pid', async (req, res, next) => {
  try {
    const product = await productManager.readOne(req.params.pid);
    if (!product) return res.status(404).json({ statusCode: 404, error: 'Product not found' });
    res.json({ statusCode: 200, response: product });
  } catch (error) {
    next(error);
  }
});

router.put('/:pid', validateProduct, async (req, res, next) => {
  try {
    const updatedProduct = await productManager.update(req.params.pid, req.body);
    if (!updatedProduct) return res.status(404).json({ statusCode: 404, error: 'Product not found' });
    res.json({ statusCode: 200, response: updatedProduct });
  } catch (error) {
    next(error);
  }
});

router.delete('/:pid', async (req, res, next) => {
  try {
    await productManager.destroy(req.params.pid);
    res.json({ statusCode: 200, response: req.params.pid });
  } catch (error) {
    next(error);
  }
});

export default router;
