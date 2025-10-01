const { mongoose } = require("mongoose");
const CartModel = require("../models/cart");

const getCartByUserId = async (userId) => {
  return await CartModel.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });
};

const createCart = async (data) => {
  const cart = new CartModel({
    userId: new mongoose.Types.ObjectId(data.userId),
    books: data.books,
    createdAt: new Date(),
    updatedAt: new Date(),
    totalAmount: data.totalAmount,
    isPurchased: data.isPurchased,
  });
  return await cart.save();
};

const updateBooksQuantity = async (cartId, updatedCart) => {
  return await CartModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(cartId) },
    {
      $set: {
        "books.$[elem].quantity": updatedCart.quantity,
        totalAmount: updatedCart.quantity * updatedCart.price,
      },
    },
    {
      arrayFilters: [
        {
          "elem.productId": new mongoose.Types.ObjectId(updatedCart.productId),
        },
      ],
      new: true,
    }
  );
};

const updateCartBooks = async (cartId, bookId) => {
  const cart = await CartModel.findOne({
    _id: new mongoose.Types.ObjectId(cartId),
  });

  const book = cart.books.find((item) =>
    item.productId.equals(new mongoose.Types.ObjectId(bookId))
  );

  if (!cart) {
    throw new Error("Cart not found");
  }

  return await CartModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(cartId) },
    {
      $set: {
        books: cart.books.filter((item) => !item.productId.equals(bookId)),
        totalAmount: cart.totalAmount - book.price * book.quantity,
      },
    },
    { new: true }
  );
};

const deleteCart = async (cartId) => {
  return await CartModel.findByIdAndDelete(cartId);
};

module.exports = {
  getCartByUserId,
  createCart,
  updateBooksQuantity,
  updateCartBooks,
  deleteCart,
};
