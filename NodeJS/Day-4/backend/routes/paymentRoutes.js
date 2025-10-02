const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/", authMiddleware, async (req, res) => {
  const { products } = req.body;

  const lineItems = products.books.map((product) => {
    return {
      price_data: {
        currency: "egp",
        product_data: {
          name: product.title,
          images: [product.poster],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  return res.status(200).json({ url: session.url });
});

module.exports = router;
