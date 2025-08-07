// models/AdminUser.js
const mongoose = require("mongoose");

const adminuserSchema = new mongoose.Schema({
  username: String,
  password: String, // In production, hash your passwords!
});

module.exports = mongoose.model("Adminuser", adminuserSchema);
