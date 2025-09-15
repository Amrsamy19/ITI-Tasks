const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middlewares/logger");
const connectDB = require("./db/db");
require("dotenv").config();

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
