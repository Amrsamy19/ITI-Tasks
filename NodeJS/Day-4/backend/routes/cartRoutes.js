const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getCart,
  addCart,
  updateCartById,
  deleteCartById,
} = require("../controllers/cartController");

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addCart);
router.put("/:id", authMiddleware, updateCartById);
router.delete("/:id", authMiddleware, deleteCartById);

module.exports = router;
