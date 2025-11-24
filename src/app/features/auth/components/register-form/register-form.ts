import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserCreateDTO } from '../../models/user-create.dto';
import { UserApiService } from '../../services/user-api-service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
  });

  userApiService = inject(UserApiService);

  onSubmit() {
    if (this.registerForm.valid) {
      const userCreateDTO = new UserCreateDTO(this.registerForm.value.name!);
      this.userApiService.createUser(userCreateDTO).subscribe({
        next: (result) => {
          console.log('User created', result);
        },
        error: (error) => {
          console.error('Error creating user', error);
        },
      });
    }
  }
}
