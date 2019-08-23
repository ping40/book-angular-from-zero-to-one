import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  {
    path:'', 
    redirectTo: 'todo', 
    pathMatch: 'full'
  },
  {
    path: 'login', 
    component:  LoginComponent
  },
  {
    path: 'todo', 
    redirectTo: 'todo'
  }
];

export const routing12 = RouterModule.forRoot(routes);
