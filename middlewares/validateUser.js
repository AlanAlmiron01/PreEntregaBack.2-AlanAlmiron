export default (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ statusCode: 400, error: 'Missing required fields: name and email are required' });
  }
  next();
};
