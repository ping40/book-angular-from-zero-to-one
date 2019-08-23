import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }     from '@angular/forms';
      

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService }  from './todo/todo-data';
    
import {  HttpClientModule
}       from '@angular/common/http';
        
 import { routing12 } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(  InMemoryTodoDbService ),
    routing12,
    TodoModule
  ],
  providers: [
    {provide: 'auth', useClass: AuthService}
  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
