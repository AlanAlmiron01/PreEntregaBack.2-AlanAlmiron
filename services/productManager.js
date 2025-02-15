import fs from 'fs/promises';
import path from 'path';
import generateId from '../utils/generateId.js';

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'data', 'products.json');

class ProductManager {
  async read() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async readOne(id) {
    const products = await this.read();
    return products.find(p => p._id === id);
  }

  async create(product) {
    const products = await this.read();
    const newProduct = {
      _id: generateId(),
      title: product.title,
      category: product.category || 'Default Category',
      thumbnails: product.thumbnails || ['https://via.placeholder.com/150'],
      price: product.price || 1,
      stock: product.stock || 1,
      description: product.description || 'No description provided'
    };
    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, data) {
    const products = await this.read();
    const index = products.findIndex(p => p._id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return products[index];
  }

  async destroy(id) {
    let products = await this.read();
    const filtered = products.filter(p => p._id !== id);
    if (products.length === filtered.length) return null;
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
    return id;
  }
}

export default ProductManager;
