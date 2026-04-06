import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public readonly loginForm: FormGroup;
  public readonly isSubmitting = signal(false);

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onLogin() {
    this.isSubmitting.set(true);

    this.userService.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        alert('User login success');
        this.isSubmitting.set(false);
        this.loginForm.reset();
        localStorage.setItem('loginData', JSON.stringify(res.data))
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert(error.error);
        this.isSubmitting.set(false);
      },
    );
  }
}
