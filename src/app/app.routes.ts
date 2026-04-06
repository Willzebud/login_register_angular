import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Register } from './pages/register/register';
import { AuthPage } from './pages/auth-page/auth-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth-page',
    pathMatch: 'full',
  },
  {
    path: 'auth-page',
    component: AuthPage,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
    ],
  },
];
