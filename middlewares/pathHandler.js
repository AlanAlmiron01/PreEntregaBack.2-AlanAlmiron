function pathHandler(req, res) {
  res.status(404).json({
    statusCode: 404,
    error: 'Route not found',
  });
}

module.exports = pathHandler;
