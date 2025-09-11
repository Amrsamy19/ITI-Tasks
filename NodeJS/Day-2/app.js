const http = require("http");
const bookRoutes = require("./routes/bookRoutes");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, title, description"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Delegate requests to routes
  bookRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
