const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Admin/Superadmin can create/update/delete
router.post("/", auth, allowRoles("superadmin"), createBlog);
router.put("/:id", auth, allowRoles("superadmin"), updateBlog);
router.delete("/:id", auth, allowRoles("superadmin"), deleteBlog);

// Users can read
router.get("/", getBlogs);
router.get("/:id", getBlogById);

module.exports = router;
