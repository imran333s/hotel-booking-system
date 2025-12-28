const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
} = require("../controllers/bookingController");

// USER
router.post("/", auth, allowRoles("user"), createBooking);
router.get("/my", auth, allowRoles("user"), getUserBookings);
router.put(
  "/:id/cancel",
  auth,
  allowRoles("user", "admin", "superadmin"),
  cancelBooking
);


// ADMIN
// ADMIN + SUPER ADMIN
router.get(
  "/",
  auth,
  allowRoles("admin", "superadmin"),
  getAllBookings
);


module.exports = router;
