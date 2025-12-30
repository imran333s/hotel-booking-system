const Role = require("../models/Role");

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    console.error("Get roles error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new role (Admin only)
exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exists = await Role.findOne({ name });
    if (exists) return res.status(400).json({ message: "Role already exists" });

    const role = new Role({ name, description });
    await role.save();
    res.json({ success: true, message: "Role created", role });
  } catch (err) {
    console.error("Create role error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete a role (Admin only)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json({ success: true, message: "Role deleted" });
  } catch (err) {
    console.error("Delete role error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
