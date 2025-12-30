// routes/roleRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  getRoles,
  createRole,
  deleteRole,
} = require("../controllers/roleController");

// Only superadmin can add/delete roles
router.post("/", auth, allowRoles("superadmin"), createRole);
router.delete("/:id", auth, allowRoles("superadmin"), deleteRole);

// Superadmin & admin can view roles
router.get("/", auth, allowRoles("superadmin", "admin"), getRoles);

module.exports = router;
