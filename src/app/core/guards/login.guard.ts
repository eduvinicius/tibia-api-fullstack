import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/firebase/auth.service";


@Injectable({
  providedIn: 'root',
})
export class LoginGuard  {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authenticated = this._authService.isAuthenticated();
      if (!authenticated) {
          return true;
      } else {
          this._router.navigate(['/home']);
          return false;
      }
  }
}
