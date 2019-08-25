import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid'
import { Todo } from '../domain/entities';

import { catchError, map, tap, filter } from 'rxjs/operators';

import { Observable, of, BehaviorSubject } from 'rxjs';

const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
//  private api_url = 'pingkaoiadsfki/todos' ;
  private api_url = 'http://localhost:3000/todos' ;

  private headerss = new Headers({'Content-type': 'application/json'});
  private userId: string;

  private _todos: BehaviorSubject<Todo[]>; 
  private dataStore: {  // This is where we will store our data in memory
    todos: Todo[]
  };

  constructor(private http: HttpClient, @Inject('auth') private authService ) {
    this.authService.getAuth()
      .pipe(
        //  不明白 为什么有这个错误： error TS2339: Property 'user' does not exist on type 'unknown'
//        filter(auth => auth.user != null) 
      )
      .subscribe(auth => this.userId = auth.user.id);
    this.dataStore = { todos: [] };
    this._todos = new BehaviorSubject<Todo[]>([]);
   }

   get todos(){
    return this._todos.asObservable();
  }

  addTodo(todoItem: string) {
    const userId: number = +localStorage.getItem('userId');

    let todo = {
      id: UUID.UUID(),
      desc: todoItem,
      completed: false,
      userId: userId
    }
    console.log(`in addTodo todo.service.ts  ${todo.id}`);

    this.http.post<Todo>(this.api_url,  todo,  httpOptions )
                   .subscribe(todo => {
                        this.dataStore.todos = [...this.dataStore.todos, todo];
                        this._todos.next(Object.assign({}, this.dataStore).todos);
                   });
                    
  }

  toggleTodo(todo: Todo) {
    const url =`${this.api_url}/${todo.id}`;
    console.log(`in toggleTodo  001 ${url}  , ${todo}`);
    const i = this.dataStore.todos.indexOf(todo);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});

    console.log(`in toggleTodo  002 ${url}  , ${todo}, ${updatedTodo}`);

    this.http
              .put<Todo>(url, updatedTodo, httpOptions)
              .subscribe(_ => {
                this.dataStore.todos = [
                  ...this.dataStore.todos.slice(0,i),
                  updatedTodo,
                  ...this.dataStore.todos.slice(i+1)
                ];
                this._todos.next(Object.assign({}, this.dataStore).todos);
              });

  }


  deleteTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    this.http
                    .delete<Todo>(url, httpOptions)
                    .subscribe(_ => {
                      this.dataStore.todos = [
                        ...this.dataStore.todos.slice(0,i),
                        ...this.dataStore.todos.slice(i+1)
                      ];
                      this._todos.next(Object.assign({}, this.dataStore).todos);
                    });
  }

  filterTodos(f123: string) {

    const userId: number = +localStorage.getItem('userId');

    let  myurl: string = `${this.api_url}?userId=${userId}`;
    switch(f123) {
      case 'ACTIVE':
        myurl = `${this.api_url}?completed=false&userId=${userId}`;
        break;
      case 'COMPLETED':
          myurl = `${this.api_url}?completed=true&userId=${userId}`;
          break;
    }
    console.log(`in todo.service.ts , myurl =  ${myurl}  , ${f123}`);
    this.http.get<Todo[]>(myurl)
      .subscribe(todos => this.updateStoreAndSubject(todos));;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      console.log(`TodoService: ${message}`);
    }
    
    toggleAll(){
      this.dataStore.todos.forEach(todo => this.toggleTodo(todo));
    }
    clearCompleted(){
      this.dataStore.todos
        .filter(todo => todo.completed)
        .forEach(todo => this.deleteTodo(todo));
    }

    private updateStoreAndSubject(todos) {
      this.dataStore.todos = [...todos];
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }

}
