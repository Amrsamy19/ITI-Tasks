const data = {
  name: "",
  address: "",
  age: 0,
};

const handler = {
  set(target, prop, value) {
    if (target.hasOwnProperty(prop)) {
      if (prop === "name" && value.length !== 7 && typeof value === "string") {
        throw new Error("Name must be string of only 7 characters");
      }
      if (
        prop === "age" &&
        typeof value === "number" &&
        (value < 25 || value > 60)
      ) {
        throw new Error("Age must be a number between 25 and 60");
      }
      if (prop === "address" && typeof value !== "string") {
        throw new Error("Address must be a string");
      }

      target[prop] = value;
    } else {
      throw new Error("Invalid property");
    }
  },
};

const proxy = new Proxy(data, handler);

proxy.name = "Johnass";
proxy.age = 30;
proxy.address = "London";

console.log(proxy);
