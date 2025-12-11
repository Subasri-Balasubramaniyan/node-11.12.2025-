// config/db.js
const mongoose = require("mongoose");

const connectDB = async (uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/phase8") => {
  try {
    await mongoose.connect(uri);  // No options needed in Mongoose v7+
    console.log("MongoDB connected:", uri);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
};

module.exports = { connectDB, disconnectDB };
