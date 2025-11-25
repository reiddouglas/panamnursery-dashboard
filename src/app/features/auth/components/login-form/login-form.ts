import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserApiService } from '../../services/user-api-service';
import { UserLoginDTO } from '../../models/user-login.dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  submitInvalidFlags: { [key: string]: boolean } = {};
  displayNames: Record<string, string> = UserLoginDTO.getAllDisplayNames();

  userApiService = inject(UserApiService);
  errors: string[] = [];
  submitted: boolean = false;

  clearSubmitError(controlName: string) {
    this.submitInvalidFlags[controlName] = false;
  }

  showRedGlow(controlName: string): boolean {
    return !!this.submitInvalidFlags[controlName];
  }

  onSubmit() {
    this.errors = [];
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      if (control && control.invalid) {
        this.submitInvalidFlags[key] = true; // set flag only if invalid
      }
    });
    if (this.loginForm.valid) {
      const userLoginDTO = new UserLoginDTO(
        this.loginForm.value.username!.trim(),
        this.loginForm.value.password!.trim(),
      );
      this.userApiService.loginUser(userLoginDTO).subscribe({
        next: (result) => {
          console.log('User logged in', result);
        },
        error: (error) => {
          console.error('Error logging user in', error);
        },
      });
    } else {
      // Required field errors
      const requiredMissing: string[] = [];
      Object.keys(this.loginForm.controls).forEach((key) => {
        if (this.loginForm.get(key)?.hasError('required')) {
          requiredMissing.push(this.displayNames[key] ?? key);
        }
      });
      if (requiredMissing.length > 0) {
        this.errors.push(`Missing required fields: ${requiredMissing.join(', ')}`);
      }
    }
  }
}
