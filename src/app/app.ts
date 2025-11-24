import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './features/auth/components/register-form/register-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('panamnursery-dashboard');
}
