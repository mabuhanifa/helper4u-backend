const notFoundMiddleware = (req, res) => {
  res.status(404).json({ success: false, message: "Route does not exist. 404 - Not Found" });
};

module.exports = notFoundMiddleware