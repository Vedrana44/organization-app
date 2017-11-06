import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Todo } from '../models/todo.model';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [
    TodoService
],
})
export class TodoComponent implements OnInit, OnDestroy {

  todos: Todo[];
  private subscription: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.subscription = this.todoService.todosChanged
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.todoService.startedEditing.next(index);
  }

  onRemove(index: number) {
    this.todoService.removeTodo(index);
  }

}
