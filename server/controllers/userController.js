// controllers/userController.js
const User = require("../models/User");

// USER updates HIS OWN profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,           // 🔒 important
    { name, email },
    { new: true }
  ).select("-password");

  res.json(user);
};
