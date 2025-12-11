// tests/integration/api.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase8_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("API integration tests", () => {
  test("POST /api/users returns 400 for invalid email", async () => {
    const res = await request(app).post("/api/users").send({ name: "Test", email: "bad" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("Create course and prevent deletion when enrollments exist", async () => {
    // create user
    const userRes = await request(app).post("/api/users").send({ name: "Stu", email: `stu${Date.now()}@test.com` });
    const user = userRes.body.data;

    // create course
    const courseRes = await request(app).post("/api/courses").send({ title: "DelTestCourse" });
    const course = courseRes.body.data;

    // enroll
    const enrollRes = await request(app).post("/api/enrollments").send({ student: user._id, course: course._id });
    expect(enrollRes.status).toBe(201);

    // attempt delete course => should fail
    const delRes = await request(app).delete(`/api/courses/${course._id}`).send();
    expect(delRes.status).toBe(400);
    expect(delRes.body.success).toBe(false);
  });
});
