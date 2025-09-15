const express = require("express");
const { createNewUser, login, currentUser } = require("../services/auth");
const router = express.Router();

router.post("/register", createNewUser);

router.post("/login", login);

module.exports = router;
