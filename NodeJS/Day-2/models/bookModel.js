const fs = require("fs");
const filePath = "books.json";

function getAllBooks() {
  return JSON.parse(fs.readFileSync(filePath));
}

function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books));
}

module.exports = { getAllBooks, saveBooks };
