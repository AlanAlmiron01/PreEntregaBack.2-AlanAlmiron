import { Router } from 'express';
import CartManager from '../../services/cartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res, next) => {
  try {
    const cartData = req.body && req.body.products && req.body.user_id ? req.body : { products: [], user_id: 'guest' };
    const newCart = await cartManager.create(cartData);
    res.status(201).json({ statusCode: 201, response: newCart });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const carts = await cartManager.read();
    res.json({ statusCode: 200, response: carts });
  } catch (error) {
    next(error);
  }
});

router.get('/:cid', async (req, res, next) => {
  try {
    const cart = await cartManager.readOne(req.params.cid);
    if (!cart) return res.status(404).json({ statusCode: 404, error: 'Cart not found' });
    res.json({ statusCode: 200, response: cart });
  } catch (error) {
    next(error);
  }
});

router.post('/:cid/product/:pid', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

router.put('/:cid/product/:pid', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    res.json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

router.delete('/:cid/product/:pid', async (req, res, next) => {
  try {
    const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

router.delete('/:cid', async (req, res, next) => {
  try {
    const deletedCart = await cartManager.destroy(req.params.cid);
    res.json({ statusCode: 200, response: deletedCart });
  } catch (error) {
    next(error);
  }
});

export default router;
