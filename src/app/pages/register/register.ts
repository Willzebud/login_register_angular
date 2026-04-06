import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user-Service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public registerForm!: FormGroup;
  public isSubmitting = signal(false);

  @Output() registerSuccess = new EventEmitter<void>();

  private readonly userService = inject(UserService);
  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', Validators.required],
    });
  }

  public passwordMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirm = this.registerForm.get('confirmPassword')?.value;
    return password === confirm;
  }

  public onRegister() {
    this.isSubmitting.set(true);

    this.userService.registerUser(this.registerForm.value).subscribe(
      (res) => {
        alert('User registration success');
        this.isSubmitting.set(false);
        this.registerForm.reset();
        this.registerSuccess.emit();
      },
      (error) => {
        alert(error.error);
        this.isSubmitting.set(false);
      },
    );
  }
}
