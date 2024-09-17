import { Routes } from '@angular/router';
import { initialRoutes } from '../components/initial/initial.routes';
import { internalRoutes } from '../components/internal/internal.routes';

export const coreRoutes: Routes = [
  ...initialRoutes,
  ...internalRoutes
];
