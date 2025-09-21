const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  getUserByUserName,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.get("/username/:userName", getUserByUserName);

module.exports = router;
