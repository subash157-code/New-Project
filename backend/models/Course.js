const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  image: String,
  duration: String,
  description: String,
  payment: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Course", courseSchema);