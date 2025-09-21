export const LinkedListObject = {
  data: [{ value: 1 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }],
  push: (value) => {
    if (LinkedListObject.data === null) {
      LinkedListObject.data = [{ value: value }];
    } else if (LinkedListObject.data.includes(value)) {
      console.log("Value already exists in the list.");
    } else if (
      value > LinkedListObject.data[LinkedListObject.data.length - 1].value
    ) {
      LinkedListObject.data.push({ value: value });
    } else {
      console.log("Value is not greater than the last element");
    }
  },
  pop: () => {
    if (LinkedListObject.data.length === 0) {
      console.log("List is empty");
    }
    return LinkedListObject.data.pop();
  },
  view: function () {
    return LinkedListObject.data;
  },
  enqueue: (value, index) => {
    if (index < 0 || index > LinkedListObject.data.length) {
      console.log("Index out of bounds");
    } else if (LinkedListObject.data.includes({ value: value })) {
      console.log("Value already exists in the list.");
    } else if (index === LinkedListObject.data.length) {
      // Works for inserting at the end
      if (LinkedListObject.data[index - 1].value >= value) {
        console.log("Value must be greater than the previous element");
      } else {
        LinkedListObject.data.push({ value: value });
      }
    } else {
      // Works for inserting in the middle or the beginning
      if (
        !(
          LinkedListObject.data[index + 1].value >= value &&
          LinkedListObject.data[index].value <= value
        )
      ) {
        console.log(
          "Value must be greater than the previous element and less than the next element"
        );
      } else {
        LinkedListObject.data.splice(index + 1, 0, { value: value });
      }
    }
  },
  dequeue: () => {
    if (LinkedListObject.data.length === 0) {
      console.log("List is empty");
    } else {
      return LinkedListObject.data.shift();
    }
  },
  remove: (value) => {
    const index = LinkedListObject.data.findIndex((item) => item.value === value);
    if (index !== -1) {
      LinkedListObject.data.splice(index, 1);
    } else {
      console.log("Value is not found");
    }
  },
};
