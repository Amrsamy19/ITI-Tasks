const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middlewares/logger");
const connectDB = require("./db/db");
const { PORT, createApiPrefix } = require("./utils/utils");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use(createApiPrefix("/auth"), authRoutes);
app.use(createApiPrefix("/users"), userRoutes);
app.use(createApiPrefix("/books"), bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
