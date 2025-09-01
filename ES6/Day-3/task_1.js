class Polygon {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Square extends Polygon {
  constructor(side) {
    super(side, side);
  }

  toString() {
    return `The Area of the square which has side ${this.width} is ${
      this.width * this.width
    }`;
  }
}

class Triangle extends Polygon {
  constructor(width, height) {
    super(width, height);
  }

  toString() {
    return `The Area of the triangle which has width ${this.width} and height ${
      this.height
    } is ${(this.width * this.height) / 2}`;
  }
}

class Rectangle extends Polygon {
  constructor(width, height) {
    super(width, height);
  }

  toString() {
    return `The Area of the rectangle which has width ${
      this.width
    } and height ${this.height} is ${this.width * this.height}`;
  }
}

class Circle extends Polygon {
  constructor(width) {
    super(width, width);
  }

  toString() {
    return `The Area of the circle which has radius ${this.width} is ${
      Math.PI * this.width * this.width
    }`;
  }
}

//get canvas
const canvas = document.querySelector("#canvas");

//get context
const ctx = canvas.getContext("2d");

//draw square
const drawSquare = (side) => {
  let square = new Square(side);
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, side, side);
  console.log(square.toString());
};

//draw rectangle
const drawRectangle = (width, height) => {
  let rectangle = new Rectangle(width, height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, width, height);
  console.log(rectangle.toString());
};

//draw circle
const drawCircle = (radius) => {
  let circle = new Circle(radius);
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(100, 100, radius, 0, 2 * Math.PI);
  ctx.fill();
  console.log(circle.toString());
};

//draw triangle
const drawTriangle = (width, height) => {
  let triangle = new Triangle(width, height);
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(width, height);
  ctx.lineTo(width / 2, 0);
  ctx.closePath();
  ctx.fill();
  console.log(triangle.toString());
};

//clear canvas
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//add event listener to buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    clearCanvas();
    const type = button.dataset.poly;
    if (type === "square") {
      drawSquare(100);
    } else if (type === "rectangle") {
      drawRectangle(400, 500);
    } else if (type === "circle") {
      drawCircle(100);
    } else if (type === "triangle") {
      drawTriangle(300, 400);
    }
  });
});
