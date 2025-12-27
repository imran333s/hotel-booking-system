const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require("../controllers/bookingController");

router.post("/", auth, allowRoles("user"), createBooking);
router.get("/", auth, allowRoles("user"), getUserBookings);
router.put("/:id/cancel", auth, allowRoles("user"), cancelBooking);

module.exports = router;
