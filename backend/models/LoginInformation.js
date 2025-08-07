const mongoose = require("mongoose");

const LoginInformationSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LoginInformation", LoginInformationSchema);
