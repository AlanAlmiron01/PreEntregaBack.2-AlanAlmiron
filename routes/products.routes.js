const express = require('express');
const router = express.Router();
const productManager = require('../services/productManager');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.json({ status: 'success', response: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
