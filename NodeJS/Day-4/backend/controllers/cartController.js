const {
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
} = require("../services/cart");

const getCart = async (req, res) => {
  const cart = await getCartByUserId(req.currentUser.id);

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  res.status(200).json(cart);
};

const addCart = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: "Cart data is missing" });
  }

  const total = body.books
    .reduce((acc, book) => acc + book.price, 0)
    .toFixed(2);

  await createCart({
    books: body.books,
    userId: req.currentUser.id,
    totalAmount: total,
    isPurchased: body.isPurchased || false,
  });

  res.status(201).json({ message: "Cart added successfully" });
};

const updateCartById = async (req, res) => {
  const cart = await updateCart(req.params.id, req.body);
  res.status(200).json(cart);
};

const deleteCartById = async (req, res) => {
  await deleteCart(req.params.id);
  res.status(200).json({ message: "Cart deleted successfully" });
};

module.exports = {
  getCart,
  addCart,
  updateCartById,
  deleteCartById,
};
