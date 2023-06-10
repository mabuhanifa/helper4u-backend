// Error middleware
const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ success: false, message: "Bad request" });
  } else {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = errorMiddleware;
