const fs = require("fs");
const filePath = "books.json";

function getAllBooks(id) {
  if (id) {
    const books = JSON.parse(fs.readFileSync(filePath));
    return books.find((book) => book.id === Number(id));
  }
  return JSON.parse(fs.readFileSync(filePath));
}

function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books));
}

module.exports = { getAllBooks, saveBooks };
