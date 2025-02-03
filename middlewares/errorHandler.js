export default (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ statusCode: 500, error: err.message || 'Internal Server Error' });
};
