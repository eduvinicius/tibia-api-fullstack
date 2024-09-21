import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { SessionService } from "../session/session.service";
import { collection, doc, Firestore, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    firebaseAuth = inject(Auth);
    fireStore = inject(Firestore);
    user$ = user(this.firebaseAuth);
    constructor(
      private _sessionService: SessionService
    ) { }

    registerUser(email: string, userName: string, password: string): Observable<void> {
      const promise = createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password,
      ).then((response) => {
        return updateProfile(response.user, { displayName: userName });
      });

      return from(promise);
    }

    editUser(userId: string, additionalInfo: any): Observable<void> {
      const collectionRef = collection(this.fireStore, 'users');
      const userDoc = doc(collectionRef, userId);
      const promise = setDoc(userDoc, additionalInfo, { merge: true });

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
