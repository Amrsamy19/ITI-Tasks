// Task-1
const symbolReplace = {
  [Symbol.replace]: function (str) {
    if (str.length > 15) {
      return str.substring(0, 15) + "...";
    } else {
      return str;
    }
  },
};

console.log("I hate implementing symbol".replace(symbolReplace));

// Task-2
const Iterator = (data) => {
  data[Symbol.iterator] = function () {
    const entries = Object.entries(this);// ["name", "JavaScript"], ["owner", "John Doe"], ["duration", 3
    let index = 0;

    return {
      next() {
        if (index < entries.length) {
          const [key, value] = entries[index++];
          return { value: { key, value }, done: false };
        }
        return { done: true };
      },
    };
  };
  return data;
};

const symbolIterator = Iterator({
  name: "JavaScript",
  owner: "John Doe",
  duration: 3,
});

for (const { key, value } of symbolIterator) {
  console.log(`${key}: ${value}`);
}

// Task-3
const courseData = (data = {}) => {
  const { name, owner, duration } = data;

  const isChecked = Object.keys(data).every(
    (item) => item === "name" || item === "owner" || item === "duration"
  );

  if (isChecked && name && owner && duration) {
    return `Name: ${name}, Owner: ${owner}, Duration: ${duration}`;
  } else {
    throw new Error("Invalid data");
  }
};

// console.log(courseData({ name: "JavaScript", owner: "John Doe", duration: 3 }));
console.log(
  courseData({ name: "JavaScript", owner: "John Doe", duration: 3, age: 5 })
);
