import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password?.value && confirmPassword?.value) {
          if (password?.value !== confirmPassword?.value) {
              password?.setErrors({ passwordMismatch: true });
              confirmPassword?.setErrors({ passwordMismatch: true });
              return { errors: true };
          } else if (password.hasError('passwordStrength') || confirmPassword.hasError('passwordStrength')) {
              return null;
          } else {
              password?.setErrors(null);
              confirmPassword?.setErrors(null);
              return null;
          }
      }

      return null;
  };
}
