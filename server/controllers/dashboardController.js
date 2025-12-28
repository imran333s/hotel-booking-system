const Booking = require("../models/Booking");
const User = require("../models/User");

exports.getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const booked = await Booking.countDocuments({ status: "booked" });
    const cancelled = await Booking.countDocuments({ status: "cancelled" });
    const successful = await Booking.countDocuments({ status: "successful" });

    const totalAdmins = await User.countDocuments({ role: { $in: ["admin", "superadmin"] } });
    const totalEmployees = await User.countDocuments({ role: { $in: ["manager", "receptionist", "waiter", "cook"] } });
    const totalUsers = await User.countDocuments({ role: "user" });

    res.json({
      totalBookings,
      booked,
      cancelled,
      successful,
      totalAdmins,
      totalEmployees,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};
