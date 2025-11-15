import express from "express";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

export default app;

if (
  process.argv[1].replaceAll(" ", "%20") === new URL(import.meta.url).pathname
) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
