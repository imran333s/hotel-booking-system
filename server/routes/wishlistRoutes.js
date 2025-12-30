const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");


// USER WISHLIST
router.get("/", auth, getWishlist);
router.post("/:hotelId", auth, addToWishlist);
router.delete("/:hotelId", auth, removeFromWishlist);

module.exports = router;
