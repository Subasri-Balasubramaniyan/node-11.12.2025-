// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const { createCourse, deleteCourse, getCourses } = require("../controllers/courseController");

router.post("/", createCourse);
router.get("/", getCourses);
router.delete("/:id", deleteCourse);

module.exports = router;
