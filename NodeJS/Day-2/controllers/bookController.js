const { getAllBooks, saveBooks } = require("../models/bookModel");

function getBooks(req, res) {
  const books = getAllBooks();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(books));
}

function addBook(req, res, body) {
  const books = getAllBooks();
  const { title, description } = JSON.parse(body);
  const newBook = { id: books.length + 1, title, description };
  books.push(newBook);
  saveBooks(books);
  res.writeHead(201);
  res.end();
}

function updateBook(req, res, body) {
  const books = getAllBooks();
  const { title, description } = JSON.parse(body);
  const id = req.url.split("/")[2];
  const bookIndex = books.findIndex((book) => book.id === Number(id));
  books[bookIndex] = { ...books[bookIndex], title, description };
  saveBooks(books);
  res.writeHead(200);
  res.end();
}

function deleteBook(req, res) {
  const books = getAllBooks();
  const id = req.url.split("/")[2];
  const bookIndex = books.findIndex((book) => book.id === Number(id));
  books.splice(bookIndex, 1);
  saveBooks(books);
  res.writeHead(200);
  res.end();
}

module.exports = { getBooks, addBook, updateBook, deleteBook };
