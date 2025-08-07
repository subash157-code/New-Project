const mongoose = require("mongoose");

const userResultSchema = new mongoose.Schema({
  username: String,
  email: String,
  mobile: String,
  answers: Object,
  score: Number,
});

module.exports = mongoose.model("UserResult", userResultSchema);
