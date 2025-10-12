import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import schema from "./schema/graphql.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/graphql_api")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/graphql", createHandler({ schema }));

app.get("/", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(5000, () => console.log(`Server running on http://localhost:5000`));
