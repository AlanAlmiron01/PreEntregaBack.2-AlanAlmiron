// middlewares/pathHandler.js
export default (req, res) => {
  res.status(404).json({ statusCode: 404, error: 'Route not found' });
};
