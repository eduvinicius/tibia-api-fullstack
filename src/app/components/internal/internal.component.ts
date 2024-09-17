import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../core/services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
  standalone: true
})
export class InternalComponent implements OnInit {

  constructor(
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this._sessionService.clearSession();
    this._router.navigate(['/login']);
  }
}
