function Shape() {
  if (this.constructor === Shape) {
    throw new Error("Shape is an abstract class");
  }
}

Rectangle.rectangleInstance = null;
Square.squareInstance = null;

//!Rectangle
function Rectangle(width = 0, height = 0) {
  if (this.constructor === Rectangle && Rectangle.rectangleInstance)
    throw new Error("Only one instance is allowed");

  if (!(this instanceof Rectangle)) return new Rectangle(width, height);

  Shape.call(this);

  Object.defineProperty(this, "width", {
    value: width,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  Object.defineProperty(this, "height", {
    value: height,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  Rectangle.rectangleInstance = this;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
  return this.width * this.height;
};

Rectangle.prototype.perimeter = function () {
  return 2 * (this.width + this.height);
};

Rectangle.prototype.toString = function () {
  return `Rectangle: ${this.width} x ${
    this.height
  }, Area: ${this.area()}, Perimeter: ${this.perimeter()}`;
};

Rectangle.prototype.valueOf = function () {
  return this.area();
};

//!Square
function Square(side) {
  if (this.constructor === Square && Square.squareInstance)
    throw new Error("Only one instance is allowed");

  if (!(this instanceof Square)) return new Square(side);

  Rectangle.call(this, side, side);

  Object.defineProperty(this, "side", {
    value: side,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  Square.squareInstance = this;
  Square.count = (Square.count || 0) + 1;
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.toString = function () {
  return `Square: ${this.width} x ${
    this.height
  }, Area: ${this.area()}, Perimeter: ${this.perimeter()}`;
};

Square.prototype.valueOf = function () {
  return this.area();
};

const firstRect = new Rectangle(3, 4);
console.log(firstRect.toString());

// const sRect = new Rectangle(3, 4);
// console.log(sRect.toString());

const square = new Square(5);
console.log(square.toString());
// const square1 = new Square(5);
// console.log(square1.toString());

console.log(`Square Count: ${Square.count}`);

console.log(`Sum of Areas: ${firstRect + square}`);
console.log(`Subtraction of Areas: ${firstRect - square}`);
