const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

//Book Routes
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleware, addBook);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
