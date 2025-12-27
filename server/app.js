// app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

module.exports = app;
