// models/cart.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Cada objeto dentro del array representa un ítem del carrito.
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  state: {
    type: String,
    enum: ['reserved', 'paid', 'delivered'],
    default: 'reserved'
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
