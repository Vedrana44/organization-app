import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {

  @ViewChild('f') todoForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.subscription = this.todoService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.todoService.getTodo(index);
          this.todoForm.setValue({
            title: this.editedItem.title,
            description: this.editedItem.description
          });
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newTodo = new Todo(value.title, value.description);
    if (this.editMode) {
      this.todoService.updateTodo(this.editedItemIndex, newTodo);
    } else {
      this.todoService.addTodo(newTodo);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.todoForm.reset();
    this.editMode = false;
  }

  onRemove() {
    this.todoService.removeTodo(this.editedItemIndex);
    this.onClear();
  }

}
