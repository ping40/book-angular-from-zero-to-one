import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  {path:'', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo', component:  TodoComponent},
  {path: 'login', component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
