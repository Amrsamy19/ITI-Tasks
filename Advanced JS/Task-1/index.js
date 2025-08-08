import { LinkedListObject } from "./LinkedList.js";

import { FirstWay, SecondWay } from "./Parameters.js";

console.log("Initial List:", LinkedListObject.view());
LinkedListObject.push(7);
console.log("Updated List after push:", LinkedListObject.view());
LinkedListObject.push(0);
console.log("Updated List after push:", LinkedListObject.view());
LinkedListObject.dequeue();
console.log("Updated List after dequeue:", LinkedListObject.view());
LinkedListObject.enqueue(8, 5);
console.log("Updated List after enqueue:", LinkedListObject.view());
LinkedListObject.enqueue(5.5, 2);
console.log("Updated List after enqueue:", LinkedListObject.view());
LinkedListObject.remove(5.5);
console.log("Updated List after remove:", LinkedListObject.view());
LinkedListObject.remove(10);
console.log("Updated List after remove:", LinkedListObject.view());
LinkedListObject.pop();
console.log("Updated List after pop:", LinkedListObject.view());

// console.log(FirstWay(1, 2, 3, 4, 5)); // [5, 4, 3, 2, 1]
// console.log(SecondWay(1, 2, 3, 4, 5)); // [5, 4, 3, 2, 1]
