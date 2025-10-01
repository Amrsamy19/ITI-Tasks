const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getCart,
  addCart,
  updateCartBooksById,
  deleteCartById,
} = require("../controllers/cartController");

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addCart);
router.patch("/:id", authMiddleware, updateCartBooksById);
router.delete("/:id", authMiddleware, deleteCartById);

module.exports = router;
