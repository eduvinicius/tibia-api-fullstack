import { Injectable } from '@angular/core';
import { Session } from '../../models/interfaces/session.interface';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private storageKey = 'userSession';

  constructor() { }

  setSession(sessionData: User | null): void {
    localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
  }

  getSession(): any {
    const sessionData = localStorage.getItem(this.storageKey);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  clearSession(): void {
    localStorage.removeItem(this.storageKey);
  }
}
