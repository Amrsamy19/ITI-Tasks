//Task 2
let firstObject = {
  name: "John",
  age: 30,
  getSetGenerator: function () {
    // Object.keys(this).forEach((key) => {
    //   this["get" + key[0].toUpperCase() + key.slice(1)] = function () {
    //     return this[key];
    //   };
    //   this["set" + key[0].toUpperCase() + key.slice(1)] = function (value) {
    //     this[key] = value;
    //   };
    // });
    for (let key in this) {
      if (typeof this[key] !== "function") {
        let setter = "set" + key[0].toUpperCase() + key.slice(1);
        let getter = "get" + key[0].toUpperCase() + key.slice(1);
        this[setter] = function (value) {
          this[key] = value;
        };
        this[getter] = function () {
          return this[key];
        };
      }
    }
  },
};

console.log(firstObject);
firstObject.getSetGenerator();
console.log(firstObject);
// console.log(firstObject.getAge());
// firstObject.setAge(20);
// console.log(firstObject.getAge());

// let secondObject = {
//   data_1: 1,
//   data_2: 2,
// };

// firstObject.getSetGenerator.call(secondObject);

// console.log(secondObject);

// console.log(secondObject.getData_1());
// secondObject.setData_1(10);
// console.log(secondObject.getData_1());
