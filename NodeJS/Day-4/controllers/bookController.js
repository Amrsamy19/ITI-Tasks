const {
  getAllBooks,
  getById,
  addBookFromDB,
  updateBookFromDB,
  deleteBookFromDB,
} = require("../services/book");

const getBooks = async (req, res) => {
  let books = await getAllBooks();

  if (Object.keys(req.query).length > 0) {
    const { sort, q } = req.query;

    if (!q && !sort) return res.status(200).json(books);

    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(q.toLowerCase()) ||
        book.description.toLowerCase().includes(q.toLowerCase())
    );

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

const getBookById = async (req, res) => {
  const books = await getById(req.params.id);
  if (!books) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(books);
};

const addBook = async (req, res) => {
  const books = await getAllBooks();
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description required" });
  }

  const newBook = { id: books.length + 1, title, description };
  books.push(newBook);
  saveBooks(books);

  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  const books = await getAllBooks();
  const { title, description } = req.body;
  const id = req.params.id;

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], title, description };
  updateBookFromDB(id, books[bookIndex]);

  res.status(200).json(books[bookIndex]);
};

const deleteBook = async (req, res) => {
  const books = await getAllBooks();
  const id = req.params.id;

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deleted = books.splice(bookIndex, 1);
  deleteBookFromDB(id);

  res.status(200).json(deleted[0]);
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
