// models/Course.js
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Course title required"] },
  category: { type: String, default: "General" },
  lessons: { type: [lessonSchema], default: [] },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  enrolleeCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
