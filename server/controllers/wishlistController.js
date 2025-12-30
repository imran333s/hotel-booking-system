const User = require("../models/User");
const Hotel = require("../models/Hotel");

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // ✅ Make sure req.user.id exists
    if (!user.wishlist.includes(req.params.hotelId)) {
      user.wishlist.push(req.params.hotelId);
      await user.save();
    }
    res.json(user.wishlist);
  } catch (err) {
    console.error("Add to wishlist error:", err); // 🔹 add this line
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.hotelId
    );
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
