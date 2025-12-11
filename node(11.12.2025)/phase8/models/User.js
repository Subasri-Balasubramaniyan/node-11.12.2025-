// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name required"] },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
