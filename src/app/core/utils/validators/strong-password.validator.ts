import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecialCharacter = /\W+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacter;

        if (!passwordValid) {
            return { passwordStrength: true };
        }

        return null;
    };
}
