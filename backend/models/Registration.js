const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventId: Number,
  eventName: String,
  name: String,
  email: String,
  mobile: String,
  memberType: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
