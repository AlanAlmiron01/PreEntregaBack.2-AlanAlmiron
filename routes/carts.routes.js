import express from 'express';
import CartManager from '../services/cartManager.js';
import validateCart from '../middlewares/validateCart.js';

const router = express.Router();
const cartManager = new CartManager();

// Create cart (POST /api/carts)
// Se puede enviar { products: [], user_id: 'someUserId' } o dejarlo vacío (se crea un carrito vacío)
router.post('/', async (req, res, next) => {
  try {
    // Si no se envía nada, se crea un carrito vacío con user_id 'guest'
    const cartData = req.body && req.body.products && req.body.user_id ? req.body : { products: [], user_id: 'guest' };
    const newId = await cartManager.create(cartData);
    res.status(201).json({ statusCode: 201, response: newId });
  } catch (error) {
    next(error);
  }
});

// Read all carts (GET /api/carts)
router.get('/', async (req, res, next) => {
  try {
    const carts = await cartManager.read();
    res.status(200).json({ statusCode: 200, response: carts });
  } catch (error) {
    next(error);
  }
});

// Read one cart (GET /api/carts/:cid)
router.get('/:cid', async (req, res, next) => {
  try {
    const cart = await cartManager.readOne(req.params.cid);
    if (!cart) return res.status(404).json({ statusCode: 404, error: 'Cart not found' });
    res.status(200).json({ statusCode: 200, response: cart });
  } catch (error) {
    next(error);
  }
});

// Add product to cart (POST /api/carts/:cid/product/:pid)
// Body: { quantity: number }
router.post('/:cid/product/:pid', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.status(200).json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

// Update product quantity in cart (PUT /api/carts/:cid/product/:pid)
// Body: { quantity: number }
router.put('/:cid/product/:pid', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    if (!updatedCart) return res.status(404).json({ statusCode: 404, error: 'Cart or product not found' });
    res.status(200).json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

// Remove product from cart (DELETE /api/carts/:cid/product/:pid)
router.delete('/:cid/product/:pid', async (req, res, next) => {
  try {
    const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ statusCode: 404, error: 'Cart or product not found' });
    res.status(200).json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

// Delete entire cart (DELETE /api/carts/:cid)
router.delete('/:cid', async (req, res, next) => {
  try {
    const deletedId = await cartManager.destroy(req.params.cid);
    if (!deletedId) return res.status(404).json({ statusCode: 404, error: 'Cart not found' });
    res.status(200).json({ statusCode: 200, response: deletedId });
  } catch (error) {
    next(error);
  }
});

export default router;
