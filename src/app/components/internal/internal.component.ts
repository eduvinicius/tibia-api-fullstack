import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet]
})
export class InternalComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
