//Task 1
function Rectangle(width = 0, height = 0) {
  this.width = width;
  this.height = height;

  // this.area = function () {
  //   return this.width * this.height;
  // };

  // this.perimeter = function () {
  //   return 2 * (this.width + this.height);
  // };

  // this.displayInfo = function () {
  //   return `Rectangle: width=${this.width}, height=${
  //     this.height
  //   }, area=${this.area()}, perimeter=${this.perimeter()}`;
  // };
}

Rectangle.prototype.area = function () {
  return this.width * this.height;
};

Rectangle.prototype.perimeter = function () {
  return 2 * (this.width + this.height);
};

Rectangle.prototype.displayInfo = function () {
  return `Rectangle: width=${this.width}, height=${
    this.height
  }, area=${this.area()}, perimeter=${this.perimeter()}`;
};

let rect = new Rectangle(3, 4);
console.log(rect.displayInfo());
