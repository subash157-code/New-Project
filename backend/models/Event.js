// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: String,
  deadlineDate: { type: Date, required: true },
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
