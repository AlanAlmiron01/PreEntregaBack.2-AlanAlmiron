// models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnails: { type: [String], default: ['/assets/default-bike.png'] },
  category: { type: String, default: 'General' },
  price: { type: Number, default: 1 },
  stock: { type: Number, default: 1 },
  description: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
