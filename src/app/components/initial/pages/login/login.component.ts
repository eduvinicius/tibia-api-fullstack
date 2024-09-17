import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { AuthService } from '../../../../core/services/firebase/auth.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SessionService } from '../../../../core/services/session/session.service';
import { LoginErrors } from '../../../../core/enums/errors.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
})
export class LoginComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  loginForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  message: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    public errorMatcher: MyErrorStateMatcherService,
    private _authService: AuthService,
    private _sessionService: SessionService
  ) {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  login(): void {
    const formValue = this.loginForm.value;
    if (this.loginForm.invalid) {
      this._snackBar.open('Campos Inválidos', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'end',

      });
      return;
    }
    this._authService.loginUser(formValue.email, formValue.password)
      .pipe(
        takeUntil(this._destroy$),
        switchMap(() => this._authService.user$)
      ).subscribe({
        next: (user) => {
          this._sessionService.setSession(user);
          this._router.navigate(['/home']);
        },
        error: (error) => {
          this.message = error.code === LoginErrors.InvalidLogin ? 'Credenciais inválidas' : 'Erro ao efetuar login';
          this._snackBar.open(this.message, 'Fechar', {
            duration: 2000,
            horizontalPosition: 'end',
          });
      }});
  }
}
