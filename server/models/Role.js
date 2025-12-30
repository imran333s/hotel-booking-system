const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // role name, e.g., admin, employee
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);
