const { create } = require("../models/user");
const {
  getById,
  getAllBooks,
  getUsersBooks,
  addBookFromDB,
  getGenresFromDB,
  updateBookFromDB,
  deleteBookFromDB,
} = require("../services/book");
const mongoose = require("mongoose");

const getBooks = async (req, res) => {
  let books = await getAllBooks();

  if (Object.keys(req.query).length > 0) {
    const { sort, q } = req.query;

    if (!q && !sort) return res.status(200).json(books);

    if (q) {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(q.toLowerCase()) ||
          book.description.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    if (sort && !sort.match(/^-?price$/)) {
      return res.status(400).json({ message: "Invalid sort query" });
    }

    books = books.sort((a, b) => {
      if (sort === "price") {
        return a.price - b.price;
      } else if (sort === "-price") {
        return b.price - a.price;
      }
    });
  }

  res.status(200).json(books);
};

const getGenres = async (req, res) => {
  const genres = await getGenresFromDB();

  if (!genres) {
    return res.status(404).json({ error: "Genres not found" });
  }
  res.status(200).json(genres);
};

const getBookById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  const books = await getById(req.params.id);

  if (!books) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(books);
};

const getBooksByUserId = async (req, res) => {
  const books = await getUsersBooks(req.currentUser.id);

  if (books.length === 0) {
    return res
      .status(404)
      .json({ error: "No books were created by this user" });
  }

  res.status(200).json(books);
};

const addBook = async (req, res) => {
  const { body, currentUser } = req;

  if (!body) {
    return res.status(400).json({ error: "Book data is missing" });
  }

  await addBookFromDB({ ...body, createdBy: currentUser.id });

  res.status(201).json({ message: "Book added successfully" });
};

const updateBook = async (req, res) => {
  const book = req.body;
  const id = req.params.id;

  if (!book) {
    return res.status(400).json({ error: "Book data is missing" });
  }

  if (book.createdBy !== req.currentUser.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this book" });
  }

  if (book.price < 0) {
    return res.status(400).json({ error: "Book price cannot be negative" });
  }

  const updatedBook = await updateBookFromDB(id, book);
  res.status(200).json(updatedBook);
};

const deleteBook = async (req, res) => {
  const id = req.params.id;

  const book = await getById(id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  deleteBookFromDB(id);

  res.status(200).json({ message: "Book deleted successfully" });
};

module.exports = {
  getBooks,
  getBookById,
  getBooksByUserId,
  getGenres,
  addBook,
  updateBook,
  deleteBook,
};
