// controllers/enrollmentController.js
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

exports.createEnrollment = async (req, res, next) => {
  try {
    const { student, course } = req.body;

    // create enrollment
    const enrollment = await Enrollment.create({ student, course, progress: 0 });

    // increment course enrolleeCount safely (non-transactional)
    await Course.updateOne({ _id: course }, { $inc: { enrolleeCount: 1 } });

    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    next(err);
  }
};

exports.getEnrollmentsByCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const enrollments = await Enrollment.find({ course: courseId }).populate("student").populate("course");
    res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (err) {
    next(err);
  }
};
