import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/firebase/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard  {
    constructor(
      private readonly _authService: AuthService,
      private readonly _router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const authenticated = this._authService.isAuthenticated();
        if (authenticated) {
            return true;
        } else {
            this._router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
            return false;
        }
    }
}
