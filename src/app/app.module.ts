import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }     from '@angular/forms';
      
//如果引入 json-server,那么要屏蔽调内存web
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService }  from './todo/todo-data';
    
import {  HttpClientModule
}       from '@angular/common/http';
        
 import {  AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { TodoModule } from './todo/todo.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
//    HttpClientInMemoryWebApiModule.forRoot(  InMemoryTodoDbService ),
    AppRoutingModule,
    TodoModule,
    CoreModule
  ],
  providers: [
    {provide: 'auth', useClass: AuthService}
  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
