const products = require('../data/products.json');

async function getAllProducts() {
  return products;
}

module.exports = {
  getAllProducts,
};
