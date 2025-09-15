const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  getUserByUserName,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/username/:userName", getUserByUserName);

module.exports = router;
