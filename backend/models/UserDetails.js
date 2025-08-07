const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true }
});

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
