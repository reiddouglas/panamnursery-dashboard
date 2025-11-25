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

  userApiService = inject(UserApiService);

  onSubmit() {
    if (this.loginForm.valid) {
      const userLoginDTO = new UserLoginDTO(
        this.loginForm.value.username!,
        this.loginForm.value.password!,
      );
      this.userApiService.loginUser(userLoginDTO).subscribe({
        next: (result) => {
          console.log('User logged in', result);
        },
        error: (error) => {
          console.error('Error logging user in', error);
        },
      });
    }
  }
}
