const http = require("http");
const fs = require("fs");

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

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

  const method = req.method;
  const books = JSON.parse(fs.readFileSync("books.json"));

  if (method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(books));
  } else if (method === "POST") {
    getRequestBody(req).then((data) => {
      const { title, description } = JSON.parse(data);
      const newBook = { id: books.length + 1, title, description };
      books.push(newBook);
      fs.writeFileSync("books.json", JSON.stringify(books));
      res.writeHead(201);
      res.end();
    });
  } else if (method === "PUT") {
    getRequestBody(req).then((data) => {
      const { title, description } = JSON.parse(data);
      const id = req.url.split("/")[2];
      const bookIndex = books.findIndex((book) => book.id === Number(id));
      books[bookIndex] = { ...books[bookIndex], title, description };
      fs.writeFileSync("books.json", JSON.stringify(books));
      res.writeHead(200);
      res.end();
    });
  } else if (method === "DELETE") {
    const id = req.url.split("/")[2];
    const bookIndex = books.findIndex((book) => book.id === Number(id));
    books.splice(bookIndex, 1);
    fs.writeFileSync("books.json", JSON.stringify(books));
    res.writeHead(200);
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
