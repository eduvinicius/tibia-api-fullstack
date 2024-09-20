import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginGuard } from '../../core/guards/login.guard';
import { InternalComponent } from '../internal/internal.component';

export const initialRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
  }
];


