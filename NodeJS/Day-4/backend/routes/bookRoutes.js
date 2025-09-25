const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getBooks,
  getBookById,
  getBooksByUserId,
  addBook,
  updateBook,
  deleteBook,
  getGenres,
} = require("../controllers/bookController");

//Book Routes
router.get("/", getBooks);
router.get("/genres", getGenres);
router.get("/:id", getBookById);
router.get("/user/:id", authMiddleware, getBooksByUserId);
router.post("/", authMiddleware, addBook);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
