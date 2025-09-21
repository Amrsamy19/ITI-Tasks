const BookModel = require("../models/book");

const getAllBooks = async () => {
  return await BookModel.find();
};

const getById = async (bookId) => {
  return await BookModel.findById(bookId);
};

const addBookFromDB = async (newBook) => {
  const bookModel = new BookModel({
    title: newBook.title,
    bookCoverImage: newBook.bookCoverImage,
    description: newBook.description || "",
    genre: newBook.genre || "",
    price: newBook.price,
    publishedYear: new Date(newBook.createdAt).getFullYear(),
    createdBy: newBook.createdBy,
  });
  return await bookModel.save();
};

const updateBookFromDB = async (bookId, updatedBook) => {
  updatedBook.updatedAt = new Date();
  return await BookModel.findByIdAndUpdate(bookId, updatedBook, { new: true });
};

const deleteBookFromDB = async (bookId) => {
  return await BookModel.findByIdAndDelete(bookId);
};

module.exports = {
  getAllBooks,
  getById,
  addBookFromDB,
  updateBookFromDB,
  deleteBookFromDB,
};
