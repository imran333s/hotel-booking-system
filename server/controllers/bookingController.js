const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, user: req.user._id });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("hotel", "name location");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
