import { Component, computed, signal } from '@angular/core';
import { UserAuthType } from '../../models/user-type';
import { Login } from '../login/login';
import { Register } from '../register/register';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [Login, Register],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  public readonly activeForm = signal<UserAuthType>('Login');

  public readonly isLoginActive = computed(() => this.activeForm() === 'Login');
  public readonly isRegisterActive = computed(() => this.activeForm() === 'Register');

  public changeView(formName: UserAuthType) {
    this.activeForm.set(formName);
  }
}
