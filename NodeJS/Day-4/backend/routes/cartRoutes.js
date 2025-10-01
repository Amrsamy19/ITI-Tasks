const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getCart,
  addCart,
  updateCart,
  updateCartBooksById,
  deleteCartById,
} = require("../controllers/cartController");

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addCart);
router.put("/:cartId/:bookId", authMiddleware, updateCart);
router.patch("/:id", authMiddleware, updateCartBooksById);
router.delete("/:id", authMiddleware, deleteCartById);

module.exports = router;
