import { Component, OnInit } from '@angular/core';

import { Todo }  from "./todo.model";
import {TodoService} from './todo.service';

@Component({
//  selector: 'app-todo', 因为没有用到，所以可以删除
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos:  Todo[] = [];
  desc = '';


  constructor(private tds:TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  addTodo(){
    this.tds.addTodo( this.desc )
      .subscribe(
        v => {
          console.log( `in add Todo  ping001 ${v} `);
          this.todos = [...this.todos, v ];
          this.desc = ''; 
         } 
      );
   }

   toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo) ;
    console.log( `in toggleTodo component.ts   ping001 ${i} `);
    this.tds
          .toggleTodo(todo)
          .subscribe(
            _ => {
              console.log( `in toggleTodo component.ts   ping002  `);
              this.getTodos();
            }
          );
   }

   removeTodo(todo: Todo): void {

    const i = this.todos.indexOf(todo) ;
    this.tds
          .deleteTodoById(todo.id)
          .subscribe(
            t => {
              console.log(`removeTodo ${t}`);
              this.todos = [
                ...this.todos.slice(0,i),
                ...this.todos.slice(i+1)
              ];
            }
          ) ;
   }

   getTodos(): void {
     this.tds
            .getTodos()
            .subscribe(t => this.todos = t );
   }

   onTextChanges(v) {
     console.log(` in onTextChanges    ${v} `);

    this.desc = v;
   }

}
