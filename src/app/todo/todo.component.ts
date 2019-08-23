import { Component, OnInit } from '@angular/core';

import { Todo }  from "./todo.model";
import {TodoService} from './todo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
//  selector: 'app-todo', 因为没有用到，所以可以删除
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos:  Todo[] = [];
  desc = '';


  constructor(
    private tds:TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.forEach(
      (p: Params) => {
        let f123 = p['filter'];
        this.filterTodos(f123);
      }
    );
    
    this.filterTodos('ALL');
  }

  filterTodos(f123: string) {
    this.tds
      .filterTodos(f123)
      .subscribe(t => this.todos = t );
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
    console.log( `in toggleTodo in todo.component.ts   ping001 ${i} `);
    this.tds
          .toggleTodo(todo)
          .subscribe(
            _ => {
              console.log( `in toggleTodo in todo.component.ts   ping002  `);
              this.filterTodos('ALL');
            }
          );
   }

   removeTodo(todo: Todo): void {
     

    console.log( `call  removeTodo in todo.component.ts `);
    const i = this.todos.indexOf(todo) ;
    this.tds
          .deleteTodoById(todo.id)
          .subscribe(
            t => {
              console.log(`in todo.component.ts  removeTodo i =${i}, total: ${this.todos.length}`);
              this.todos = [
                ...this.todos.slice(0,i),
                ...this.todos.slice(i+1)
              ];
            }
          ) ;
   }

   onTextChanges(v) {
     console.log(` in onTextChanges    ${v} `);

    this.desc = v;
   }

   toggleAll() {
     this.todos.forEach(
       todo => {
         this.toggleTodo(todo);
       }
     );
   }

   clearCompleted() {
     const todos = this.todos.filter(
       todo => {
         let ok =  todo.completed == true;

         console.log(` in clearComplated ok : ${ok}`);
         return ok;
       }
     );

     // 存在 并发消息的问题
     todos.forEach(
       todo => {
         console.log(` in clearComplated ${todo.desc}`);
         this.removeTodo(todo);
       }
     );

     this.filterTodos('ALL'); // 如果没有这个，页面显示是错误的
   }

}
