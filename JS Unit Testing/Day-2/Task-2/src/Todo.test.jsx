import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
import "@testing-library/jest-dom";

beforeEach(() => {
  localStorage.clear();
});

describe("Todo", () => {
  test("renders component correctly with initial props", () => {
    render(<Todo initialItems={["Test 1"]} />);
    expect(screen.getByText("To-Do")).toBeInTheDocument();
    expect(screen.getByText("Test 1")).toBeInTheDocument();
  });

  test("input field updates when typing", () => {
    render(<Todo />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "New Todo" } });
    expect(input.value).toBe("New Todo");
  });

  test("adding a new todo", () => {
    render(<Todo />);
    const input = screen.getByTestId("todo-input");
    const button = screen.getByTestId("add-button");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("deleting a todo", () => {
    render(<Todo initialItems={["Delete Me"]} />);
    const deleteButton = screen.getByTestId("delete-button-0");
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });

  test("useEffect interacts with localStorage", () => {
    localStorage.setItem("todos", JSON.stringify(["Stored Todo"]));
    render(<Todo />);
    expect(screen.getByText("Stored Todo")).toBeInTheDocument();
  });

  test("renders todos from props correctly", () => {
    const initialTodos = ["Todo-1", "Todo-2"];
    render(<Todo initialItems={initialTodos} />);

    initialTodos.forEach((todo) => {
      expect(screen.getByText(todo)).toBeInTheDocument();
    });

    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems.length).toBe(initialTodos.length);
  });
});
