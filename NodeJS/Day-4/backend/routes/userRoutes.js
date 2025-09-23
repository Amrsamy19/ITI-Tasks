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

router.use(authMiddleware);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/username/:userName", getUserByUserName);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
