import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { AuthService } from '../../../../core/services/firebase/auth.service';
import { SessionService } from '../../../../core/services/session/session.service';

import { CheckClickElementDirective } from '../../../../core/directives/check-click-element.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatIconModule, MatMenuModule, RouterModule, CheckClickElementDirective],
  standalone: true
})
export class HeaderComponent implements OnInit {
  @ViewChild('profileMenu') profileMenu!: ElementRef;

  isSideNavMenuOpen: boolean = false;
  isMenuProfileOpen: boolean = false;
  userName: string = '';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _sessionService: SessionService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    const session = this._sessionService.getSession();
    const userName = session?.providerData[0]?.displayName;
    this.userName = userName;
  }

  onProfileMenuClickOutside(event: boolean): void {
    this.isMenuProfileOpen = event;
  }

  openSideNavMenu(): void {
    this.isSideNavMenuOpen = !this.isSideNavMenuOpen;
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
