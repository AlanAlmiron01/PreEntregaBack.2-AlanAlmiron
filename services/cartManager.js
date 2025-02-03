import fs from 'fs/promises';
import path from 'path';
import generateId from '../utils/generateId.js';
import ProductManager from './productManager.js';

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'data', 'carts.json');

class CartManager {
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

  async create(cart) {
    const carts = await this.read();
    const newCart = {
      _id: generateId(),
      products: cart.products || [],
      user_id: cart.user_id || 'guest'
    };
    carts.push(newCart);
    await this.write(carts);
    return newCart._id;
  }

  async readOne(id) {
    const carts = await this.read();
    return carts.find(c => c._id === id);
  }

  async destroy(id) {
    const carts = await this.read();
    const filtered = carts.filter(c => c._id !== id);
    if (carts.length === filtered.length) return null;
    await this.write(filtered);
    return id;
  }

  // Agrega un producto al carrito, o aumenta la cantidad si ya existe.
  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.read();
    const cartIndex = carts.findIndex(c => c._id === cartId);
    if (cartIndex === -1) throw new Error('Cart not found');
    
    // Verificar stock usando ProductManager
    const productManager = new ProductManager();
    const product = await productManager.readOne(productId);
    if (!product) throw new Error('Product not found');
    
    const cart = carts[cartIndex];
    const existingProduct = cart.products.find(p => p.productId === productId);
    let newQuantity = quantity;
    if (existingProduct) {
      newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > product.stock) throw new Error('Quantity exceeds available stock');
      existingProduct.quantity = newQuantity;
    } else {
      if (quantity > product.stock) throw new Error('Quantity exceeds available stock');
      cart.products.push({ productId, quantity });
    }
    await this.write(carts);
    return cart;
  }

  // Actualiza la cantidad de un producto específico en el carrito.
  async updateProductQuantity(cartId, productId, quantity) {
    const carts = await this.read();
    const cartIndex = carts.findIndex(c => c._id === cartId);
    if (cartIndex === -1) throw new Error('Cart not found');
    
    const productManager = new ProductManager();
    const product = await productManager.readOne(productId);
    if (!product) throw new Error('Product not found');
    
    const cart = carts[cartIndex];
    const prodIndex = cart.products.findIndex(p => p.productId === productId);
    if (prodIndex === -1) throw new Error('Product not found in cart');
    
    if (quantity > product.stock) throw new Error('Quantity exceeds available stock');
    if (quantity <= 0) { 
      // Si la cantidad es cero o menor, eliminar el producto del carrito.
      cart.products.splice(prodIndex, 1);
    } else {
      cart.products[prodIndex].quantity = quantity;
    }
    await this.write(carts);
    return cart;
  }

  // Elimina un producto del carrito.
  async removeProductFromCart(cartId, productId) {
    const carts = await this.read();
    const cartIndex = carts.findIndex(c => c._id === cartId);
    if (cartIndex === -1) throw new Error('Cart not found');
    
    const cart = carts[cartIndex];
    const newProducts = cart.products.filter(p => p.productId !== productId);
    if (newProducts.length === cart.products.length) throw new Error('Product not found in cart');
    cart.products = newProducts;
    await this.write(carts);
    return cart;
  }
}

export default CartManager;
