const {
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
} = require("../services/cart");

const getCart = async (req, res) => {
  const cart = await getCartByUserId(req.user.id);

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

  await createCart({ ...body, userId: req.user.id, isPurchased: false });

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
