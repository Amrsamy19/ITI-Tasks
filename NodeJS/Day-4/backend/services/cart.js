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

const updateCart = async (cartId, updatedCart) => {
  return await CartModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(cartId) },
    { $set: { "books.$[elem].quantity": updatedCart.quantity } },
    {
      arrayFilters: [
        {
          "elem.productId": new mongoose.Types.ObjectId(updatedCart.productId),
        },
      ],
      new: true,
    },
  );
};

const deleteCart = async (cartId) => {
  return await CartModel.findByIdAndDelete(cartId);
};

module.exports = {
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
};
