import { Routes } from '@angular/router';
import { InternalComponent } from './internal.component';
import { AuthenticationGuard } from '../../core/guards/auth.guard';

export const internalRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    component: InternalComponent
  },
];
