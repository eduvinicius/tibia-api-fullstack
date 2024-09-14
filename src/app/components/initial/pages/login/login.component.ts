import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MyErrorStateMatcherService } from '../../../../core/services/my-error-state-matcher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  errorMatcher = inject(MyErrorStateMatcherService);

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
   }

  ngOnInit() {
  }

  login(): void {
    if (this.loginForm.invalid) {
      this._snackBar.open('Campos Inválidos', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'end',

      });
      return;
    }
    console.log(this.loginForm.value);
    this._router.navigate(['/home']);
  }

}
