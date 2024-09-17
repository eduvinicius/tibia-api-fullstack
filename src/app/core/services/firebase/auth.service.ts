import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { SessionService } from "../session/session.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    firebaseAuth = inject(Auth)
    user$ = user(this.firebaseAuth);
    constructor(
      private _sessionService: SessionService
    ) { }

    registerUser(email: string, username:string, password: string): Observable<void> {
      const promise = createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      ).then((response) => updateProfile(response.user, { displayName: username }));

      return from(promise);
    }

    loginUser(email: string, password: string): Observable<void> {
      const promise = signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password).then(() => {});
      return from(promise);
    }

    isAuthenticated(): boolean {
      return this._sessionService.getSession() !== null;
    }
}
