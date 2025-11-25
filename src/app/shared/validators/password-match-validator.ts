import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordField: string,
  confirmPasswordField: string,
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordField);
    const confirmPassword = form.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null; // controls not ready yet
    }

    // If confirmPassword has other errors, return to avoid overwriting them
    if (confirmPassword.errors && !confirmPassword.errors['passwordsMismatch']) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  };
}
