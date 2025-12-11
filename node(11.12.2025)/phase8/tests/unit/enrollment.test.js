// tests/unit/enrollment.test.js
const mongoose = require("mongoose");
const Enrollment = require("../../models/Enrollment");
const User = require("../../models/User");
const Course = require("../../models/Course");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase8_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("Enrollment unique index prevents duplicates", async () => {
  const u = await User.create({ name: "U1", email: `u1${Date.now()}@test.com` });
  const c = await Course.create({ title: "C1" });
  await Enrollment.create({ student: u._id, course: c._id });

  expect.assertions(1);
  try {
    // duplicate
    await Enrollment.create({ student: u._id, course: c._id });
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
