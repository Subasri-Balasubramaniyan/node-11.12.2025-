// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  // Normalize Mongoose validation / duplicate key errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  if (err.code === 11000) {
    // duplicate key
    return res.status(400).json({ success: false, message: "Duplicate key error", details: err.keyValue });
  }

  const status = err.statusCode || 500;
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message || err);
  res.status(status).json({ success: false, message: err.message || "Internal Server Error" });
};
