function validateProduct(req, res, next) {
    const { title, price, stock } = req.body;
    if (!title || price == null || stock == null) {
      return res.status(400).json({ statusCode: 400, error: 'Missing required fields' });
    }
    next();
  }
  
  module.exports = validateProduct;
  