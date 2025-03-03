// models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  total: Number,
  address: String,
  phone: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
