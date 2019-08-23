import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid'
import { Todo } from './todo.model';

import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api_url = 'pingkaoiadsfki/pingka' ;
//  private api_url = 'http://localhost:3000/pingka' ;

  private headerss = new Headers({'Content-type': 'application/json'});
        



  constructor(private http: HttpClient) { }

  addTodo(todoItem: string): Observable<Todo> {
    let todo = {
      id: UUID.UUID(),
      desc: todoItem,
      completed: false
    }
    console.log(`in addTodo todo.service.ts  ${todo.id}`);

    return this.http.post<Todo>(this.api_url,  todo,  httpOptions )
                    .pipe(
                      tap( _ => console.log("post   ")),
                      catchError(this.handleError<Todo>('post'))
                    );
                    
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    const url =`${this.api_url}/${todo.id}`;
    console.log(`in toggleTodo  001 ${url}  , ${todo}`);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});

    console.log(`in toggleTodo  002 ${url}  , ${todo}, ${updatedTodo}`);

    return this.http
              .put<Todo>(url, updatedTodo, httpOptions)
              .pipe(
                tap( _ => console.log(`toggleTodo  003 ${todo} `)),
                catchError(this.handleError<Todo>('toggleTodoById'))
              );

  }


  deleteTodoById(id: string): Observable<Todo> {
    const url = `${this.api_url}/${id}`;
    return this.http
                    .delete<Todo>(url, httpOptions)
                    .pipe(
                      tap( _ => console.log(`delete ${id} `)),
                      catchError(this.handleError<Todo>('deleteTodoById'))
                    );
  }

  filterTodos(f123: string): Observable<Todo[]> {
    let  myurl: string = `${this.api_url}`;
    switch(f123) {
      case 'ACTIVE':
        myurl = `${this.api_url}?completed=false`;
        break;
      case 'COMPLETED':
          myurl = `${this.api_url}?completed=true`;
          break;
    }
    console.log(`in todo.service.ts , myurl =  ${myurl}  , ${f123}`);
    return this.http.get<Todo[]>(myurl);
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

}
