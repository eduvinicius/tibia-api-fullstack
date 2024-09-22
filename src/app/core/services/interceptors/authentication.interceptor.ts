import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../firebase/auth.service';

export const WITH_AUTH = new HttpContextToken<boolean>(() => true);
export interface AuthenticationInterceptorConfig {
    getToken: () => string | null | undefined;
    getExpirationMilliseconds: () => number | undefined;
}
export const AUTHENTICATION_INTERCEPTOR_CONFIG = new InjectionToken<AuthenticationInterceptorConfig>('Auth Token');

export const authInterceptorConfig: AuthenticationInterceptorConfig = {
  getToken: () => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session?.accessToken || null;
  },
  getExpirationMilliseconds: () => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session?.expirationTime || undefined;
  }
};

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        @Inject(AUTHENTICATION_INTERCEPTOR_CONFIG) private config: AuthenticationInterceptorConfig,
        private authenticationService: AuthService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.config.getToken();

        const requestWithToken = request.clone({
            headers: request.headers
                .append('Authorization', `Bearer ${token}`)
                .append('Access-Control-Allow-Origin', '*'),
        });
        if(this.authenticationService.isAuthenticated() && this.authenticationService.tokenHasExpirationTime()){
            this.authenticationService.logout();
            location.reload();
            this.router.navigate(['/']).finally(() => {});
            window.location.replace('/');
            return next.handle(requestWithToken);
        }else{
            return next.handle(requestWithToken);
        }
    }

}
