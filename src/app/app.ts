import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './features/auth/components/register-form/register-form';
import { LoginForm } from './features/auth/components/login-form/login-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterForm, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('panamnursery-dashboard');
}
