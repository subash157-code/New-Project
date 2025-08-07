const mongoose = require('mongoose');

const LoginInfoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },  // Ideally hash this in real apps
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginInfo', LoginInfoSchema);
