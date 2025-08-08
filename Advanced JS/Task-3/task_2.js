function Book(
  title = "",
  numberOfChapters = 0,
  author = 0,
  numberOfPages = 0,
  publisher = "",
  numberOfCopies = 0
) {
  this.title = title;
  this.numberOfChapters = numberOfChapters;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publisher = publisher;
  this.numberOfCopies = numberOfCopies;
}

function Box(height = 0, width = 0, material = "") {
  this.height = height;
  this.width = width;
  this.material = material;
  const content = [];

  this.add = function (book) {
    content.push(book);
  };

  this.delete = function (title) {
    //delete book object by title
    content.splice(
      content.findIndex((book) => book.title === title),
      1
    );
  };

  this.getContent = function () {
    return content;
  };

  this.count = function () {
    return `Number of books in the box: ${content.length}`;
  };

  this.display = function () {
    return `Box: height=${this.height}, width=${this.width}, material=${
      this.material
    }\n Content: {
        ${content.map(
          (book) =>
            `\n\tTitle: ${book.title},
          \n\tNumber of chapters: ${book.numberOfChapters},
          \n\tAuthor: ${book.author},
          \n\tNumber of pages: ${book.numberOfPages},
          \n\tPublisher: ${book.publisher},
          \n\tNumber of copies: ${book.numberOfCopies}, \n\t\n`
        )}
      }`;
  };
}

let box = new Box(100, 100, "wooden");

box.add(new Book("Book 1", 10, "Author 1", 1000, "Publisher 1", 5));
box.add(new Book("Book 2", 20, "Author 2", 2000, "Publisher 2", 10));
box.add(new Book("Book 1", 10, "Author 1", 1000, "Publisher 1", 5));

console.log(box.count());
console.log(box.display());
box.delete("Book 1");
console.log(box.count());
console.log(box.display());
