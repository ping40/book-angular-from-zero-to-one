import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../domain/entities';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  _todos: Todo[] = [];
  @Input()
  set todos(todos:Todo[]){
    this._todos = [...todos];
  }
  get todos() {
    return this._todos;
  }
  @Output() onRemoveTodo123 = new EventEmitter<Todo>();
  @Output() onToggleTodo = new EventEmitter<Todo>();
  @Output() onToggleAll = new EventEmitter<boolean>();

  onRemoveTriggered(todo: Todo) {

    console.log( " call onRemoveTriggered ");
    this.onRemoveTodo123.emit(todo);
  }
  onToggleTriggered(todo: Todo) {
    console.log( " call onToggleTriggered ");
    this.onToggleTodo.emit(todo);
  }
  
  onToggleAllTriggered() {

    console.log( " call onToggleAllTriggered ");
    this.onToggleAll.emit(true);
  }
}
