// routes/api/carts.routes.js
import { Router } from 'express';
import passport from 'passport';
import Cart from '../../models/cart.model.js';
import Product from '../../models/product.model.js';

const router = Router();

// Opción 2: Obtener el carrito del usuario mediante query parameter.
// Esta ruta responde a GET /api/carts?user_id=...
router.get('/', passport.authenticate('current', { session: false }), async (req, res, next) => {
  try {
    const uid = req.query.user_id;
    if (!uid) return res.status(400).json({ message: 'Missing user_id query parameter' });
    const cart = await Cart.findOne({ user_id: uid }).populate('products.product_id');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// Mantener la ruta con parámetro también (GET /api/carts/:uid)
router.get('/:uid', passport.authenticate('current', { session: false }), async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.uid })
      .populate('products.product_id');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// Agregar producto al carrito
router.post('/:uid/add', passport.authenticate('current', { session: false }), async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const qty = Number(quantity);
    const product = await Product.findById(product_id);
    if (!product || product.stock < qty) {
      return res.status(400).json({ message: 'Insufficient stock or product not found' });
    }
    let cart = await Cart.findOne({ user_id: req.params.uid });
    if (!cart) {
      cart = new Cart({ user_id: req.params.uid, products: [] });
    }
    const index = cart.products.findIndex(item => item.product_id.toString() === product_id);
    if (index > -1) {
      cart.products[index].quantity += qty;
    } else {
      cart.products.push({ product_id, quantity: qty });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// Eliminar producto del carrito
router.post('/:uid/remove/:productId', passport.authenticate('current', { session: false }), async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user_id: req.params.uid });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.products = cart.products.filter(item => item.product_id.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

export default router;
