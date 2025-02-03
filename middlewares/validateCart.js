export default (req, res, next) => {
  const { products, user_id } = req.body;
  if (!products || !Array.isArray(products) || !user_id) {
    return res.status(400).json({ statusCode: 400, error: 'Missing required fields: products (array) and user_id are required' });
  }
  next();
};
