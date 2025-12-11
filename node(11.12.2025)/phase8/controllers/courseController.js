// controllers/courseController.js
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const count = await Enrollment.countDocuments({ course: courseId });
    if (count > 0) {
      const err = new Error("Cannot delete course: students are enrolled");
      err.statusCode = 400;
      return next(err);
    }
    await Course.findByIdAndDelete(courseId);
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().limit(100);
    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
};
