const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// AUTH
app.use("/api/auth", require("./routes/authRoutes"));

// PUBLIC USER (self-service)
app.use("/api/users", require("./routes/userRoutes"));

// USER WISHLIST
app.use("/api/users/wishlist", require("./routes/wishlistRoutes"));


// ADMIN PANEL USER MANAGEMENT
app.use("/api/admin/users", require("./routes/adminUserRoutes"));

// HOTELS
app.use("/api/hotels", require("./routes/hotelRoutes"));

// BOOKINGS
app.use("/api/bookings", require("./routes/bookingRoutes"));

// BLOGS
app.use("/api/blogs", require("./routes/blogRoutes"));

// DASHBOARD STATS
app.use("/api", require("./routes/dashboardRoutes"));

// ROLES
app.use("/api/roles", require("./routes/roleRoutes"));

module.exports = app;
