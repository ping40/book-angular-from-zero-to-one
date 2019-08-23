import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';


const routes: Routes = [
  {
    path: 'todo/:filter', // filter 似乎是关键词，如果修改为f123， 无效
    component: TodoComponent
  }
];

export const routing = RouterModule.forChild( routes);
