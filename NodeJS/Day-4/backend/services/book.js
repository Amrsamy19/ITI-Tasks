const { mongoose } = require("mongoose");
const BookModel = require("../models/book");
const getAllBooks = async () => {
  return await BookModel.find();
};

const getGenresFromDB = async () => {
  return await BookModel.find().select("genre").distinct("genre");
};

const getById = async (bookId) => {
  return await BookModel.findById(bookId);
};

const getUsersBooks = async (userId) => {
  return await BookModel.find({ createdBy: userId });
};

const addBookFromDB = async (newBook) => {
  const bookModel = new BookModel({
    title: newBook.title,
    bookCoverImage: newBook.bookCoverImage,
    description: newBook.description || "",
    genre: newBook.genre || "",
    price: newBook.price,
    publishedYear: new Date(newBook.createdAt).getFullYear(),
    createdBy: new mongoose.Types.ObjectId(newBook.createdBy),
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
  getById,
  getAllBooks,
  addBookFromDB,
  getUsersBooks,
  getGenresFromDB,
  updateBookFromDB,
  deleteBookFromDB,
};
