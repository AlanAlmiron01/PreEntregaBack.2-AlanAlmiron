// routes/views.routes.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = Router();

// Middleware para requerir autenticación a través de la cookie
function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/login');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.redirect('/login');
    req.user = decoded;
    next();
  });
}

// Página raíz redirige a /products si autenticado, o a login en caso contrario.
router.get('/', (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/login');
  res.redirect('/products');
});

// Vistas de login y registro
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

// Vista de productos (solo para usuarios autenticados)
router.get('/products', requireAuth, async (req, res) => {
  try {
    const products = await Product.find().limit(40);
    res.render('products', { products });
  } catch (err) {
    res.status(500).send('Error al cargar productos');
  }
});

// Vista del carrito
router.get('/cart', requireAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id }).populate('products.product_id');
    res.render('cart', { cart });
  } catch (err) {
    res.status(500).send('Error al cargar el carrito');
  }
});

// Vista de checkout
router.get('/checkout', requireAuth, (req, res) => res.render('checkout'));

// Vista de perfil
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render('profile', { user });
  } catch (err) {
    res.status(500).send('Error al cargar el perfil');
  }
});

// Vista de detalle de producto (se pasa el objeto user para usarlo en el formulario)
router.get('/products/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('product_detail', { product, user: req.user });
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
});

export default router;
