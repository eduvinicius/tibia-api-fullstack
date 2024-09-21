import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { SessionService } from '../../../../core/services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatIconModule, MatMenuModule, RouterModule],
  standalone: true
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;

  constructor(
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this._sessionService.clearSession();
    this._router.navigate(['/login']);
  }

}
