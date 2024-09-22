import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyErrorStateMatcherService } from '../../../../core/services/my-error-state-matcher.service';
import { AuthService } from '../../../../core/services/firebase/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { PasswordStrengthValidator } from '../../../../core/utils/validators/strong-password.validator';
import { confirmPasswordValidator } from '../../../../core/utils/validators/confirm-password.validator';
import { IRegisterForm } from '../../../../core/models/interfaces/register-form.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],

})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  registerForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), PasswordStrengthValidator()]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _authService: AuthService,
    public errorMatcher: MyErrorStateMatcherService
  ) {
    this.registerForm = new FormGroup({
      email: this.emailFormControl,
      userName: this.userNameFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl,
    }, { validators: confirmPasswordValidator() });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  register(): void {
    if (this.registerForm.invalid) {
      this._snackBar.open('Campos Inválidos', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'end',
      });
      return;
    }

    const formValue: IRegisterForm = this.registerForm.value;

    this._authService.registerUser(formValue.email, formValue.userName, formValue.password)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'end',
        });
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Erro ao criar usuário', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'end',
        });
    }});
  }

}
