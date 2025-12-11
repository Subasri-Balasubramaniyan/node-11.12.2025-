📌 Phase 8 — Error Handling & Testing (Node.js + Express + MongoDB + Jest)

This project demonstrates how to implement robust error handling, data validation, and automated testing for a Node.js REST API using Express, MongoDB, Mongoose, Jest, and Supertest.

⭐ Objective

The goal of this phase is to make your backend stable, safe, and production-ready by implementing:

✔️ Centralized Error Handling
✔️ Input Validation
✔️ Unit & Integration Tests
✔️ Index Testing
✔️ Logging meaningful errors
📂 Project Structure
phase8/
│── app.js
│── server.js
│── package.json
│
│── config/
│     └── db.js
│
│── middlewares/
│     └── errorHandler.js
│
│── models/
│     ├── User.js
│     ├── Course.js
│     └── Enrollment.js
│
│── controllers/
│     ├── userController.js
│     ├── courseController.js
│     └── enrollmentController.js
│
│── routes/
│     ├── userRoutes.js
│     ├── courseRoutes.js
│     └── enrollmentRoutes.js
│
│── tests/
│     ├── unit/
│     │     ├── user.test.js
│     │     ├── course.test.js
│     │     └── enrollment.test.js
│     └── integration/
│           └── api.test.js

🚀 How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Start the server
node server.js


Server runs at:

http://localhost:5000

3️⃣ Run tests
npm test


You should see output similar to:

PASS tests/integration/api.test.js
PASS tests/unit/user.test.js
PASS tests/unit/course.test.js
PASS tests/unit/enrollment.test.js
Test Suites: 4 passed
Tests:       5 passed

🧪 Testing Overview
✔️ Unit Tests

Tests for model validations:

User email format

Course must have title

Enrollment must have unique (student + course)

✔️ Integration/API Tests

Using Supertest:

Creating a user with invalid data → returns 400

Creating a course → 201

Creating an enrollment → 201

Deleting a course with enrollments → returns 400
(error handling validated)

⚠️ Error Handling Overview

Error handling follows a centralized middleware approach.

✅ All controllers use:
catch (err) {
  next(err);
}

✅ Central error handler:
module.exports = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

🎯 Benefits:

Clean controllers

All errors logged in one place

Consistent JSON error responses

No server crashes

📘 API Endpoints
Users
Method	Endpoint	Description
POST	/api/users	Create new user
GET	/api/users	Get all users
Courses
Method	Endpoint	Description
POST	/api/courses	Create new course
DELETE	/api/courses/:id	Delete course (blocked if enrollments exist)
Enrollments
Method	Endpoint	Description
POST	/api/enrollments	Enroll a student in a course
🧠 What You Learned in This Phase
✔️ Importance of validation
✔️ Why error handling matters in production
✔️ How to prevent API crashes
✔️ How to write automated tests
✔️ How to test API behavior
✔️ Ensuring database integrity (unique indexes)
