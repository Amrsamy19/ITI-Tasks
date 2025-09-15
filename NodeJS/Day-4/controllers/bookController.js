const { getAllBooks, saveBooks } = require("../services/book");

function getBooks(req, res) {
  let books = getAllBooks();

  if (Object.keys(req.query).length > 0) {
    const { sort, q } = req.query;

    if (!q && !sort) res.status(200).json(books);

    if (q) {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(q.toLowerCase()) ||
          book.description.toLowerCase().includes(q.toLowerCase())
      );
    }

    books = books.sort((a, b) =>
      req.query.sort === "-id" ? b.id - a.id : a.id - b.id
    );
  }
  res.status(200).json(books);
}

function getBookById(req, res) {
  const books = getAllBooks(req.params.id);
  if (!books) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(books);
}

function addBook(req, res) {
  const books = getAllBooks();
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description required" });
  }

  const newBook = { id: books.length + 1, title, description };
  books.push(newBook);
  saveBooks(books);

  res.status(201).json(newBook);
}

function updateBook(req, res) {
  const books = getAllBooks();
  const { title, description } = req.body;
  const id = Number(req.params.id);

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], title, description };
  saveBooks(books);

  res.status(200).json(books[bookIndex]);
}

function deleteBook(req, res) {
  const books = getAllBooks();
  const id = Number(req.params.id);

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deleted = books.splice(bookIndex, 1);
  saveBooks(books);

  res.status(200).json(deleted[0]);
}

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
