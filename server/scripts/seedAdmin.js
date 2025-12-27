const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    // Delete old admin if exists
    await User.deleteOne({ email: "admin@hotel.com" });

    const admin = new User({
      name: "Super Admin",
      email: "admin@hotel.com",
      password: "Admin@123", // plain password
      role: "superadmin",
    });

    await admin.save(); // pre-save hook hashes password
    console.log("✅ Superadmin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
