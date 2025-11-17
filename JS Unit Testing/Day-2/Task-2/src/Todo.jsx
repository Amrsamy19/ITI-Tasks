import { useState, useEffect } from "react";

export default function Todo({ initialItems = [] }) {
  const [todos, setTodos] = useState(initialItems);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const deleteTodo = (idx) => setTodos(todos.filter((_, i) => i !== idx));

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-gray-900 text-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-100">
        To-Do
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          data-testid="todo-input"
        />
        <button
          onClick={addTodo}
          className="bg-gray-700 text-gray-100 px-3 py-1 rounded hover:bg-gray-600"
          data-testid="add-button"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2" data-testid="todo-list">
        {todos.map((todo, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-800 border border-gray-700 px-2 py-1 rounded"
            data-testid="todo-item"
          >
            {todo}
            <button
              onClick={() => deleteTodo(idx)}
              className="text-red-400 hover:text-red-600"
              data-testid={`delete-button-${idx}`}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
