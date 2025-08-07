// models/Gallery.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  captureDate: Date,
  images: { type: [String], validate: v => v.length > 0, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
