//Task-1
function swapValues(a, b) {
  [a, b] = [b, a];
  return { a, b };
}
console.log(swapValues(1, 2));

//Task-2
let numbers = [1, 2, 200, 4, 5];
function maximumValue(...values) {
  return {
    max: Math.max(...values),
    min: Math.min(...values),
  };
}

console.log(maximumValue(...numbers));

//Task-3
const fruits = ["apple", "strawberry", "banana", "orange", "mango"];

//A
console.log(fruits.every((item) => typeof item === "string"));

//B
console.log(fruits.some((item) => item.startsWith("a")));

//C
console.log(
  fruits.filter((item) => item.startsWith("b") || item.startsWith("s"))
);

//D
let newFruits = fruits.map((item) => `I like ${item}`);
console.log(newFruits);

//E
newFruits.forEach((item) => console.log(item));
