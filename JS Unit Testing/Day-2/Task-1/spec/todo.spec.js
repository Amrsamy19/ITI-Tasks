import request from "supertest";
import app from "../server.js";

describe("Todos API", () => {
  it("GET /api/todos - should return 200 and an array of todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
    if (res.body.length > 0) {
      expect(res.body[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          task: jasmine.any(String),
        })
      );
    }
  });

  it("POST/api/todos - should return 201 and a new todo", async () => {
    const newTask = { task: "Test new todo" };
    const res = await request(app).post("/api/todos").send(newTask);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.task).toBeDefined();
  });

  it("POST/api/todos - should return 400 if no task is provided", async () => {
    const res = await request(app).post("/api/todos").send({});
    expect(res.status).toBe(400);
  });

  it("DELETE/api/todos/:id - should return 200 when deleting an existing todo", async () => {
    const deleteRes = await request(app).delete("/api/todos/1");
    expect(deleteRes.status).toBe(200);
  });

  it("DELETE/api/todos/:id - should return 404 when deleting a non-existing todo", async () => {
    const res = await request(app).delete("/api/todos/9999");
    expect(res.status).toBe(404);
  });
});
