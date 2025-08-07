// models/Demo.js
const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    course: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoRegistration", demoSchema);
