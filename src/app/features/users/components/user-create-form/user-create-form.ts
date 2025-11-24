import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserCreateDTO } from '../../dtos/user-create.dto';

@Component({
  selector: 'app-user-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create-form.html',
  styleUrl: './user-create-form.css',
})
export class UserCreateForm {
  userCreateForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
  });

  onSubmit() {
    if (this.userCreateForm.valid) {
      const userCreateDTO = new UserCreateDTO(this.userCreateForm.value.name!);
    }
  }
}
