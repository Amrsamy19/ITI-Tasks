import { Router } from "express";

const router = Router();

const todos = [
  { id: 1, task: "Learn JavaScript" },
  { id: 2, task: "Build a REST API" },
];

router.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

router.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ msg: "Task is required" });
  }
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ msg: "Todo not found" });
  }
  const deletedTodo = todos.splice(index, 1);
  res.status(200).json(deletedTodo[0]);
});

export default router;
