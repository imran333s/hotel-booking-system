const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true }, // short snippet for blog cards
  content: { type: String, required: true },
  image: { type: String, required: true }, // blog thumbnail
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
