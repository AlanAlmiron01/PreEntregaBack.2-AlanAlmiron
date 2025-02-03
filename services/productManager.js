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

  async write(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async create(product) {
    const products = await this.read();
    const newProduct = {
      _id: generateId(),
      title: product.title,
      category: product.category || 'Default Category',
      thumbnails: product.thumbnails || ['https://via.placeholder.com/150'],
      price: product.price || 1,
      stock: product.stock || 1
    };
    products.push(newProduct);
    await this.write(products);
    return newProduct._id;
  }

  async readOne(id) {
    const products = await this.read();
    return products.find(p => p._id === id);
  }

  async update(id, data) {
    const products = await this.read();
    const index = products.findIndex(p => p._id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    await this.write(products);
    return products[index];
  }

  async destroy(id) {
    const products = await this.read();
    const filtered = products.filter(p => p._id !== id);
    if (products.length === filtered.length) return null;
    await this.write(filtered);
    return id;
  }
}

export default ProductManager;
