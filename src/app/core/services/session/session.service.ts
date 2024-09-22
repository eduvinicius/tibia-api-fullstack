import { Injectable } from '@angular/core';
import { Session } from '../../models/interfaces/session.interface';
import { User } from '@angular/fire/auth';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _storageKey = `${environment.storagePrefix}`

  constructor() { }

  setSession(sessionData: User | null): void {
    localStorage.setItem(this._storageKey, JSON.stringify(sessionData));
  }

  getSession(): any {
    const sessionData = localStorage.getItem(this._storageKey);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  getAccessToken(): string {
    const sessionData = this.getSession();
    return sessionData ? sessionData.stsTokenManager.accessToken : '';
  }

  clearSession(): void {
    localStorage.removeItem(this._storageKey);
  }
}
