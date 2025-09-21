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

const addBook = async (req, res) => {
  const book = req.body;

  if (!book) {
    return res.status(400).json({ error: "Book data is missing" });
  }

  const newBook = await addBookFromDB(book);

  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  const book = req.body;
  const id = req.params.id;

  if (!book) {
    return res.status(400).json({ error: "Book data is missing" });
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

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
