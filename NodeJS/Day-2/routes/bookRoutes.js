const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const getRequestBody = require("../utils/bodyParser");

function bookRoutes(req, res) {
  if (req.method === "GET" && req.url === "/books") {
    return getBooks(req, res);
  }

  if (req.method === "POST" && req.url === "/books") {
    return getRequestBody(req).then((body) => addBook(req, res, body));
  }

  if (req.method === "PUT" && req.url.startsWith("/books/")) {
    return getRequestBody(req).then((body) => updateBook(req, res, body));
  }

  if (req.method === "DELETE" && req.url.startsWith("/books/")) {
    return deleteBook(req, res);
  }
}

module.exports = bookRoutes;
