const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, getUsers);
router.patch("/:id", authMiddleware, updateUserById);
router.delete("/:id", authMiddleware, deleteUserById);

module.exports = router;
