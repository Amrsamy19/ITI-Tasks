const {
  getCartByUserId,
  createCart,
  updateBooksQuantity,
  updateCartBooks,
  deleteCart,
} = require("../services/cart");

const getCart = async (req, res) => {
  const cart = await getCartByUserId(req.currentUser.id);

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  return res.status(200).json(cart);
};

const addCart = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: "Cart data is missing" });
  }

  const total = body.books
    .reduce((acc, book) => acc + book.price, 0)
    .toFixed(2);

  const cart = await createCart({
    books: body.books,
    userId: req.currentUser.id,
    totalAmount: total,
    isPurchased: body.isPurchased || false,
  });

  return res
    .status(201)
    .json({ message: "Book added to cart successfully", cart: cart });
};

const updateCartBooksById = async (req, res) => {
  const cart = await updateBooksQuantity(req.params.id, req.body);
  return res.status(200).json({ message: "Book quantity updated", cart });
};

const updateCart = async (req, res) => {
  const cart = await updateCartBooks(req.params.cartId, req.params.bookId);
  return res
    .status(200)
    .json({ message: "Removed book from cart successfully", cart });
};

const deleteCartById = async (req, res) => {
  await deleteCart(req.params.id);
  return res.status(200).json({ message: "Cart has been cleared" });
};

module.exports = {
  getCart,
  addCart,
  updateCart,
  updateCartBooksById,
  deleteCartById,
};
