import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Todo } from './todo';

describe('Todo', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todo],
    }).compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodo = 'Test Todo';
    component.addTodo();
    fixture.detectChanges();
    expect(component.todos.length).toBe(1);
    expect(component.todos[0]).toBe('Test Todo');

    const li = fixture.nativeElement.querySelector('ul li');
    expect(li.textContent).toContain('Test Todo');
  });

  it('should delete a todo', () => {
    component.todos = ['Todo 1', 'Todo 2'];
    fixture.detectChanges();

    component.deleteTodo(0);
    fixture.detectChanges();

    expect(component.todos.length).toBe(1);
    expect(component.todos[0]).toBe('Todo 2');

    const li = fixture.nativeElement.querySelectorAll('ul li');
    expect(li.length).toBe(1);
    expect(li[0].textContent).toContain('Todo 2');
  });

  it('should bind input to newTodo', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Bound Todo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.newTodo).toBe('Bound Todo');
  });

  it('should add todo when Add button is clicked', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    input.value = 'Click Todo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(component.todos.length).toBe(1);
    expect(component.todos[0]).toBe('Click Todo');
  });

  it('should delete todo when Delete button is clicked', () => {
    component.todos = ['Todo 1'];
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('ul li button')).nativeElement;
    deleteButton.click();
    fixture.detectChanges();

    expect(component.todos.length).toBe(0);
  });
});
