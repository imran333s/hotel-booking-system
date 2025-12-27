const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userManagementController");

// Admin & Super Admin can create/update/delete users
router.post("/", auth, allowRoles("superadmin"), createUser);
router.put("/:id", auth, allowRoles("superadmin"), updateUser);
router.delete("/:id", auth, allowRoles("superadmin"), deleteUser);

// Admin/Manager/Super Admin can view users
router.get("/", auth, allowRoles("superadmin","manager"), getUsers);
router.get("/:id", auth, allowRoles("superadmin","manager"), getUserById);

module.exports = router;
