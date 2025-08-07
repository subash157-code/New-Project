// models/Contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },
  mobile: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, "Mobile must be 10 digits"]
  },
  message: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactMessage", ContactSchema);
