// tests/unit/course.test.js
const mongoose = require("mongoose");
const Course = require("../../models/Course");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase8_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("Course requires title", async () => {
  expect.assertions(1);
  try {
    await Course.create({ category: "X" });
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
