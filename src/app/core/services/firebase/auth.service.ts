import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { SessionService } from "../session/session.service";
import { collection, doc, Firestore, setDoc } from "@angular/fire/firestore";
import { parseJWT } from "../../utils/parse-jwt";
import { environment } from "../../../../environments/environment";

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

    logout(): Observable<void> {
      this._sessionService.clearSession();
      return from(this.firebaseAuth.signOut());
    }

    isAuthenticated(): boolean {
      const session = localStorage.getItem(`${environment.storagePrefix}`);
      return !!(session != '{}' && session);
    }

    // Função para verificar se o token já foi expirado
    tokenHasExpirationTime(): boolean {
      const session = this._sessionService.getSession();
      const token = session?.accessToken;

      if(token){
          const json = parseJWT(token ?? ''); // Obtém o token armazenado no SessionStorage

          const tokenExp = new Date(json.exp * 1000); // Converte o valor em segundos para milissegundos

          // Obtém a hora atual
          const now = new Date();

          // Calcula a diferença em milissegundos entre a expiração do token e a hora atual
          const timeDifference = tokenExp.getTime() - now.getTime();
          const thirtyMinutesInMilliseconds = 1800000;

          // Verifica se a diferença de tempo é menor do que -30 minutos
          if (timeDifference < -thirtyMinutesInMilliseconds) {
              return true; // O token expirou mais de 30 minutos atrás
          } else {
              return false; // O token ainda é válido ou expirou recentemente
          }
      }else{
          return true
      }
  }
}

