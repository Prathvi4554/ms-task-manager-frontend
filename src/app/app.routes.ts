import {  Routes } from '@angular/router';
import { authGuard } from './shared/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/login/login.component')
                .then(m => m.LoginComponent)
    },
       {
        path: 'signup',
        loadComponent: () =>
            import('./features/signup/signup.component')
                .then(m => m.SignupComponent)
    },

      {
        path: 'task-activity',
        loadComponent: () =>
            import('./features/task-activity/task-activity.component')
                .then(m => m.TaskActivityComponent),
                  canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];


