const Booking = require("../models/Booking");

// CREATE BOOKING (USER)
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user._id,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER – MY BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hotel", "name location")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN – ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("hotel", "name location")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL BOOKING (USER)
exports.cancelBooking = async (req, res) => {
  try {
    let booking;

    // Admin / Superadmin can cancel any booking
    if (req.user.role === "admin" || req.user.role === "superadmin") {
      booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: "cancelled" },
        { new: true }
      );
    } else {
      // Regular user can only cancel their own
      booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { status: "cancelled" },
        { new: true }
      );
    }

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
