function Sequence(start = 0, end = 0, step = 0) {
  const numbers = [];

  if (start > end) throw new Error("Start must be less than end");
  if (step <= 0) throw new Error("Step must be greater than 0");

  const fillNumbers = () => {
    for (let i = start; i <= end; i += step) {
      numbers.push(i);
    }
  };

  fillNumbers();

  this.setNumbers = (value) => (numbers = value);

  this.getNumbers = () => numbers;

  this.toString = () => numbers.join(", ");

  this.append = (value) => {
    if (!numbers.findIndex((item) => item === value) === -1) {
      throw new Error("Value is duplicated");
    }
    if (numbers.length === 0) {
      numbers.push(value);
    }
    if (value === numbers[numbers.length - 1] + step) {
      numbers.push(value);
    } else {
      throw new Error("Value must be equal to the last element + step");
    }
  };

  this.prepend = (value) => {
    if (!numbers.findIndex((item) => item === value) === -1) {
      throw new Error("Value is duplicated");
    }
    if (numbers.length === 0) {
      numbers.push(value);
    }
    if (value === numbers[0] - step) {
      numbers.unshift(value);
    } else {
      throw new Error("Value must be equal to the first element - step");
    }
  };

  this.dequeue = () => {
    if (numbers.length === 0) {
      throw new Error("List is empty");
    }
    return numbers.shift();
  };

  this.pop = () => {
    if (numbers.length === 0) {
      throw new Error("List is empty");
    }
    numbers.pop();
  };
}

const seq = new Sequence(1, 10, 2);
console.log(`Initial sequence: ${seq.getNumbers()}`);
seq.pop();
console.log(`After pop: ${seq.getNumbers()}`);
// seq.append(5);
// console.log(seq.getNumbers());
seq.append(9);
console.log(`After append: ${seq.getNumbers()}`);
seq.dequeue();
console.log(`After dequeue: ${seq.getNumbers()}`);
seq.prepend(0);
console.log(`After prepend: ${seq.getNumbers()}`);
