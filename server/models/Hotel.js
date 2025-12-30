const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  address: String,
  description: String,
  pricePerNight: Number,
  rating: { type: Number, default: 4 },
  roomsAvailable: Number,
  amenities: [String],
  images: [String], // URLs instead of base64
  checkInTime: String,
  checkOutTime: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hotel", hotelSchema);
