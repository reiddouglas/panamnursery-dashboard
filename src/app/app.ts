import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCreateForm } from './features/users/components/user-create-form/user-create-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserCreateForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('panamnursery-dashboard');
}
