import { Component, OnInit } from '@angular/core';

import { Todo }  from "../domain/entities";
import {TodoService} from './todo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { pluck } from 'rxjs/operators';

@Component({
//  selector: 'app-todo', 因为没有用到，所以可以删除
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos:  Observable<Todo[]>;
  desc: string = "";

  constructor(
    private tds:TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .pipe(
          pluck("filter")
      )
      .subscribe( filter => {
        this.tds.filterTodos(filter);
        this.todos = this.tds.todos;
      });
     
  }

  addTodo(){
    this.tds.addTodo( this.desc );
   }

   toggleTodo(todo: Todo) {
    this.tds.toggleTodo(todo);
   }

   removeTodo(todo: Todo): void {
      this.tds
          .deleteTodo(todo);
   }

   onTextChanges(v) {
     console.log(` in onTextChanges    ${v} `);

    this.desc = v;
   }

   toggleAll() {
    this.tds.toggleAll();
   }

   clearCompleted() {
    this.tds.clearCompleted();
   }

}
