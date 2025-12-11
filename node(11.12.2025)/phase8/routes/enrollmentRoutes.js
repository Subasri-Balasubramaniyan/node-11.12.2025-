// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const { createEnrollment, getEnrollmentsByCourse } = require("../controllers/enrollmentController");

router.post("/", createEnrollment);
router.get("/course/:courseId", getEnrollmentsByCourse);

module.exports = router;
