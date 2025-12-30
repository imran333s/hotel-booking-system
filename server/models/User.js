const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin", "manager", "receptionist", "waiter", "cook", "user"],
    default: "user",
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }], // ✅ Wishlist field
  createdAt: { type: Date, default: Date.now },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
