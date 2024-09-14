import { Routes } from '@angular/router';
import { InternalComponent } from './internal.component';

export const internalRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: InternalComponent
  },
];
