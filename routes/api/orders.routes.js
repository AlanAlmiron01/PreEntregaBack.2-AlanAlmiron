// routes/api/orders.routes.js
import { Router } from 'express';
import passport from 'passport';
import Order from '../../models/order.model.js';
import Cart from '../../models/cart.model.js';

const router = Router();

// POST /api/orders
// Crea una orden con los datos de shippingInfo y vacía el carrito
router.post('/', passport.authenticate('current', { session: false }), async (req, res, next) => {
  try {
    const { shippingInfo } = req.body;
    // Validación mínima
    if (!shippingInfo?.address || !shippingInfo?.phone) {
      return res.status(400).json({ message: 'Missing shippingInfo.address or shippingInfo.phone' });
    }

    // Obtener carrito del usuario
    const cart = await Cart.findOne({ user_id: req.user.id }).populate('products.product_id');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Construir array de productos en formato orderSchema
    const orderProducts = cart.products.map(item => ({
      productId: item.product_id._id,
      quantity: item.quantity
    }));

    // Crear la orden
    const order = await Order.create({
      user_id: req.user.id,
      products: orderProducts,
      shippingInfo,          // { address, phone }
      status: 'pending'
    });

    // Vaciar el carrito
    cart.products = [];
    await cart.save();

    return res.status(201).json({ message: 'Order created', order });
  } catch (err) {
    next(err);
  }
});

export default router;
