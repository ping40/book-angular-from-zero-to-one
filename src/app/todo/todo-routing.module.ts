import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';


const routes: Routes = [
  {
    path: 'todo/:filter',
    component: TodoComponent
  }
];

export const routing = RouterModule.forChild( routes);
