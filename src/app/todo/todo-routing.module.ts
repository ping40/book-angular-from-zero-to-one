import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import { AuthGuardService } from '../core/auth-guard.service';


const routes: Routes = [
  {
    path: 'todo/:filter', // filter 似乎是关键词，如果修改为f123， 无效
    canActivate:  [AuthGuardService],
    component: TodoComponent
  }
];

export const routing = RouterModule.forChild( routes);
