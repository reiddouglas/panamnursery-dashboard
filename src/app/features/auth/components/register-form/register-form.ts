import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserCreateDTO } from '../../models/user-create.dto';
import { UserApiService } from '../../services/user-api-service';
import { passwordComplexityValidator } from '../../../../shared/validators/password-complexity-validator';
import { NgClass } from '@angular/common';
import { passwordMatchValidator } from '../../../../shared/validators/password-match-validator';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerForm = new FormGroup(
    {
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      phone: new FormControl<number | null>(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(10),
        Validators.maxLength(15),
      ]),
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required, passwordComplexityValidator()]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
    },
    {
      validators: passwordMatchValidator('password', 'confirmPassword'),
    },
  );

  displayNames: Record<string, string> = {
    ...UserCreateDTO.getAllDisplayNames(),
    confirmPassword: 'Confirm Password',
  };

  submitInvalidFlags: { [key: string]: boolean } = {};
  userApiService = inject(UserApiService);
  errors: string[] = [];
  passwordErrors: string[] = [];
  loading: boolean = false;

  clearSubmitError(controlName: string) {
    this.submitInvalidFlags[controlName] = false;
  }

  showRedGlow(controlName: string): boolean {
    return !!this.submitInvalidFlags[controlName];
  }

  allowNumbersOnly(event: KeyboardEvent) {
    const char = event.key;
    if (!/[\d]/.test(char)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    this.errors = [];
    this.passwordErrors = [];
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      if (control && control.invalid) {
        this.submitInvalidFlags[key] = true; // set flag only if invalid
      }
    });
    if (
      !this.loading &&
      this.registerForm.valid &&
      this.registerForm.value.password === this.registerForm.value.confirmPassword
    ) {
      const userCreateDTO = new UserCreateDTO(
        this.registerForm.value.firstName!.trim(),
        this.registerForm.value.lastName!.trim(),
        this.registerForm.value.email!.trim(),
        this.registerForm.value.phone!,
        this.registerForm.value.username!.trim(),
        this.registerForm.value.password!.trim(),
      );
      this.userApiService.createUser(userCreateDTO).subscribe({
        next: (result) => {
          console.log('User created', result);
        },
        error: (error) => {
          console.error('Error creating user', error);
        },
      });
    } else {
      // Required field errors
      const requiredMissing: string[] = [];
      Object.keys(this.registerForm.controls).forEach((key) => {
        if (this.registerForm.get(key)?.hasError('required')) {
          requiredMissing.push(this.displayNames[key] ?? key);
        }
      });
      if (requiredMissing.length > 0) {
        this.errors.push(`Missing required fields: ${requiredMissing.join(', ')}`);
      }

      // Email errors
      if (this.registerForm.get('email')?.hasError('email')) {
        this.errors.push('Invalid email format');
      }

      // Phone number errors
      const phoneControl = this.registerForm.get('phone');
      if (phoneControl && phoneControl.invalid) {
        const errors = phoneControl.errors;
        if (errors) {
          Object.keys(errors).forEach((errorKey) => {
            switch (errorKey) {
              case 'pattern':
                this.errors.push('Phone number must contain only digits');
                break;
              case 'minlength':
                const min = errors['minlength'].requiredLength;
                this.errors.push(`Phone number must be at least ${min} digits`);
                break;
              case 'maxlength':
                const max = errors['maxlength'].requiredLength;
                this.errors.push(`Phone number must be at most ${max} digits`);
                break;
              default:
                this.errors.push('Invalid phone number');
            }
          });
        }
      }

      // Password errors
      const passwordControl = this.registerForm.get('password');
      if (passwordControl?.errors) {
        const errors = passwordControl.errors;
        if (errors['minlength']) {
          this.passwordErrors.push(
            `Password must be at least ${errors['minlength'].requiredLength} characters`,
          );
        }
        if (errors['maxlength']) {
          this.passwordErrors.push(
            `Password must be at most ${errors['maxlength'].requiredLength} characters`,
          );
        }
        if (errors['missingUpperCase']) {
          this.passwordErrors.push('Password must contain at least one uppercase letter');
        }
        if (errors['missingLowerCase']) {
          this.passwordErrors.push('Password must contain at least one lowercase letter');
        }
        if (errors['missingNumber']) {
          this.passwordErrors.push('Password must contain at least one number');
        }
        if (errors['missingSpecialChar']) {
          this.passwordErrors.push(
            'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
          );
        }
      }

      // Password confirm errors
      if (this.registerForm.get('confirmPassword')?.hasError('passwordsMismatch')) {
        this.passwordErrors.push('Passwords do not match');
      }
    }
  }
}
