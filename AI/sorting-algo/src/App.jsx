import { useState } from "react";
import { ArrowUpDown, Play, RotateCcw } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [input, setInput] = useState(
    "45, 23, 78, 12, 90, 56, 34, 67, 89, 23, 45, 67, 12, 89, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90"
  );
  const [results, setResults] = useState(null);
  const [sorting, setSorting] = useState(false);

  const bubbleSort = (arr) => {
    const array = [...arr];
    const start = performance.now();
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
        }
      }
    }

    const end = performance.now();
    return {
      name: "Bubble Sort",
      sorted: array,
      time: (end - start).toFixed(8),
      comparisons,
      swaps,
      description: "O(n²) - Simple but slow for large datasets",
    };
  };

  const quickSort = (arr) => {
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const start = performance.now();

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
    const end = performance.now();

    return {
      name: "Quick Sort",
      sorted: array,
      time: (end - start).toFixed(8),
      comparisons,
      swaps,
      description: "O(n log n) - Fast and efficient average case",
    };
  };

  const mergeSort = (arr) => {
    const array = [...arr];
    let comparisons = 0;
    let merges = 0;
    const start = performance.now();

    const merge = (left, right) => {
      const result = [];
      let i = 0,
        j = 0;

      while (i < left.length && j < right.length) {
        comparisons++;
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
        merges++;
      }

      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    const sort = (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = sort(arr.slice(0, mid));
      const right = sort(arr.slice(mid));

      return merge(left, right);
    };

    const sorted = sort(array);
    const end = performance.now();

    return {
      name: "Merge Sort",
      sorted,
      time: (end - start).toFixed(8),
      comparisons,
      swaps: merges,
      description: "O(n log n) - Consistent performance, stable sort",
    };
  };

  const handleSort = () => {
    setSorting(true);

    const numbers = input
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
      alert("Please enter valid numbers separated by commas");
      setSorting(false);
      return;
    }

    setTimeout(() => {
      const bubble = bubbleSort(numbers);
      const quick = quickSort(numbers);
      const merge = mergeSort(numbers);

      setResults({
        original: numbers,
        algorithms: [bubble, quick, merge],
      });
      setSorting(false);
    }, 100);
  };

  const handleReset = () => {
    setResults(null);
    setInput(
      "45, 23, 78, 12, 90, 56, 34, 67, 89, 23, 45, 67, 12, 89, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <ArrowUpDown className="text-indigo-600" />
            Sorting Algorithm Comparison
          </h1>
          <p className="text-gray-600">
            Compare the performance of different sorting algorithms
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter Numbers (comma-separated):
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
            />
            <button
              onClick={handleSort}
              disabled={sorting}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 flex items-center gap-2 transition"
            >
              <Play size={20} />
              {sorting ? "Sorting..." : "Sort"}
            </button>
            {results && (
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 flex items-center gap-2 transition"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            )}
          </div>
        </div>

        {results && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Original Array:
              </h2>
              <div className="flex flex-wrap gap-2">
                {results.original.map((num, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-gray-200 rounded-lg font-mono"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Performance Charts
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Number of Comparisons
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={results.algorithms.map((a) => ({
                      Algorithm: a.name,
                      Comparisons: a.comparisons,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Algorithm" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Comparisons" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Swaps/Merges Operations
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={results.algorithms.map((a) => ({
                      Algorithm: a.name,
                      Operations: a.swaps,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Algorithm" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Operations" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {results.algorithms.map((algo, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">
                    {algo.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {algo.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comparisons:</span>
                      <span className="font-bold">{algo.comparisons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operations:</span>
                      <span className="font-bold">{algo.swaps}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">
                      Sorted Array:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {algo.sorted.slice(0, 10).map((num, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 bg-indigo-100 rounded text-sm font-mono"
                        >
                          {num}
                        </div>
                      ))}
                      {algo.sorted.length > 10 && (
                        <div className="px-2 py-1 text-sm text-gray-500">
                          ...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Algorithm Analysis
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">Bubble Sort</h3>
                  <p className="text-gray-700">
                    Simple but inefficient. Best for small datasets or
                    educational purposes. Time complexity: O(n²)
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="font-bold text-green-800 mb-2">Quick Sort</h3>
                  <p className="text-gray-700">
                    Fast in-place sorting. Excellent average performance. Time
                    complexity: O(n log n) average
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">Merge Sort</h3>
                  <p className="text-gray-700">
                    Consistent performance and stable. Great for linked lists.
                    Time complexity: O(n log n) guaranteed
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
