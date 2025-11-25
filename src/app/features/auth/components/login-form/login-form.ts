import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserApiService } from '../../services/user-api-service';
import { UserLoginDTO } from '../../models/user-login.dto';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  displayNames: Record<string, string> = UserLoginDTO.getAllDisplayNames();

  userApiService = inject(UserApiService);
  errors: string[] = [];

  onSubmit() {
    this.errors = [];
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
