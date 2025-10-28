/* eslint-disable no-unused-vars */
//Quick sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

//enhanced quick sort with metrics
function quickSortWithMetrics(arr) {
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  const partition = (low, high) => {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        swaps++;
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swaps++;
    return i + 1;
  };
  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };
  sort(0, array.length - 1);

  return array;
}

// generate test cases for quick sort
function testQuickSort() {
  const arr1 = [5, 3, 8, 4, 2];
  console.assert(
    JSON.stringify(quickSort(arr1)) === JSON.stringify([2, 3, 4, 5, 8]),
    "Test Case 1 Failed"
  );
  const arr2 = ["dsadas","dsds"];
  console.assert(
    JSON.stringify(quickSort(arr2)) === JSON.stringify([1]),
    "Test Case 2 Failed"
  );
  const arr3 = [];
  console.assert(
    JSON.stringify(quickSort(arr3)) === JSON.stringify([]),
    "Test Case 3 Failed"
  );
}

// Example usage to avoid unused function error
const arr = [5, 3, 8, 4, 2];
// console.log(quickSort(arr));
// console.log(quickSortWithMetrics(arr));
testQuickSort();
