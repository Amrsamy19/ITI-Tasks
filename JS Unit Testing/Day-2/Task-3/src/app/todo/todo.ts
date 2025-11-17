import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./todo.css'],
})
export class Todo {
  todos: string[] = [];
  newTodo: string = '';

  addTodo(): void {
    const text = this.newTodo?.trim();
    if (!text) return;
    this.todos = [...this.todos, text];
    this.newTodo = '';
  }

  deleteTodo(index: number): void {
    this.todos = this.todos.filter((_, i) => i !== index);
  }
}
