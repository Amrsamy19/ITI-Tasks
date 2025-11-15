//~ Problem 1
//* input: "hello world" ===> output: "Hello world"
//* input: "HELLO" ===> output: "Hello"
//* input: 12 ===> throw TypeError("parameter should be string")

const capitalizeFirstLetter = (input) => {
  if (typeof input !== "string") {
    throw new TypeError("parameter should be string");
  }
  if (input.length === 0) return "";
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
};

//? test that the function returns a string when a valid string is given
//? test that "hello" returns "Hello"
//? test that "JAVA" returns "Java"
//? test that passing a number throws TypeError
//? make one pending test case (not implemented yet)

//~ Problem 2
//* input: 4 ==> output: [2, 4, 6, 8]
//* input: 0 ==> output: []
//* input: "3" ==> throw TypeError("parameter should be number")

const generateEvenNumbers = (count) => {
  if (typeof count !== "number") {
    throw new TypeError("parameter should be number");
  }
  return Array.from({ length: count }, (_, i) => (i + 1) * 2);
};

//? test that the return value is an array
//? test that passing 4 returns [2, 4, 6, 8]
//? test that array length equals 4 when input is 4
//? test that passing a string throws TypeError
//? delay one of the tests by 3 seconds before running (simulate async)
//? write one test using expect()
//? write one test using should()
//? write one test using assert()

//~ Problem 3 (optional / bonus)
//* input: ["apple", "banana", "apple", "orange"] ==> output: ["apple", "banana", "orange"]
//* input: [1, 1, 2, 3, 2] ==> output: [1, 2, 3]

const removeDuplicates = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError("parameter should be array");
  }
  return [...new Set(array)];
};

//? test that the result has no duplicates
//? test that the output preserves order of first occurrence
//? test that non-array input throws an error
//? make one skipped test (pending) time 5000

module.exports = {
  capitalizeFirstLetter,
  generateEvenNumbers,
  removeDuplicates,
};
