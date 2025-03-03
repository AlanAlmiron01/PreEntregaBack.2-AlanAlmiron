// seed.js
import mongoose from 'mongoose'; 
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Product from './models/product.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    const productsPath = path.resolve('data', 'products.json');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    // Remueve _id para que MongoDB genere nuevos identificadores.
    productsData.forEach(product => delete product._id);
    await Product.deleteMany({});
    console.log('🗑️ Old products deleted');
    await Product.insertMany(productsData);
    console.log('✅ Products inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
  });
