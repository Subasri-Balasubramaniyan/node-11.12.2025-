// tests/unit/user.test.js
const mongoose = require("mongoose");
const User = require("../../models/User");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase8_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("User model should require valid email", async () => {
  expect.assertions(1);
  try {
    await User.create({ name: "A", email: "invalid-email" });
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
