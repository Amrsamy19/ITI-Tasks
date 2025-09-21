const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.get("/username/:userName", getUserByUserName);
router.patch("/:id", authMiddleware, updateUserById);
router.delete("/:id", authMiddleware, deleteUserById);

module.exports = router;
