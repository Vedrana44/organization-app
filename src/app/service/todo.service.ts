import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TodoService {

  todosChanged = new Subject<Todo[]>();
  startedEditing = new Subject<number>();

  private todos: Todo[] = [
    new Todo('Shopping', 'Go grocery shopping'),
    new Todo('Meeting', 'Metting in the office, 13h')
  ];

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todosChanged.next(this.todos.slice());
  }

  updateTodo(index: number, newTodo: Todo) {
    this.todos[index] = newTodo;
    this.todosChanged.next(this.todos.slice());
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }

}
