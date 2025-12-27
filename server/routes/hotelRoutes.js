const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

router.post("/", auth, allowRoles("superadmin"), createHotel);
router.get("/", getHotels);
router.get("/:id", getHotelById);
router.put("/:id", auth, allowRoles("superadmin"), updateHotel);
router.delete("/:id", auth, allowRoles("superadmin"), deleteHotel);

module.exports = router;
