const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/paymentRoutes");
const logger = require("./middlewares/logger");
const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const { getAll } = require("./services/user");
const { PORT, createApiPrefix } = require("./utils/utils");
const { register } = require("./controllers/authController");

const app = express();

connectDB();

getAll().then((users) => {
  if (users.length > 0) return;

  // Here we create the admin user for the first time
  //if we want to create a normal user then run the frontend code and backend role and register
  register({
    name: "admin",
    password: "admin",
    username: "admin",
    role: "admin",
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use(createApiPrefix("/auth"), authRoutes);
app.use(createApiPrefix("/users"), userRoutes);
app.use(createApiPrefix("/books"), bookRoutes);
app.use(createApiPrefix("/carts"), cartRoutes);
app.use(createApiPrefix("/checkout"), checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
