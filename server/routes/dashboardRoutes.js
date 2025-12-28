const express = require("express");
const router = express.Router();
const { getBookingStats } = require("../controllers/dashboardController");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

router.get("/booking-stats", auth, allowRoles("admin", "superadmin"), getBookingStats);

module.exports = router;
