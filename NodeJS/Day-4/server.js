const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const logger = require("./middlewares/middlewares");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
