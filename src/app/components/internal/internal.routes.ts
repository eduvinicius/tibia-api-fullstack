import { Routes } from '@angular/router';
import { InternalComponent } from './internal.component';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const internalRoutes: Routes = [
  {
    path: '',
    component: InternalComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'user-profile', component: UserProfileComponent }
    ]
  }
];
