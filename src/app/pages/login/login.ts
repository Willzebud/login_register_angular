import { Component, inject } from '@angular/core';
import { UserAuthType } from '../../models/user-type';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user-Service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  activeForm: UserAuthType = 'Login';
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  userService = inject(UserService);
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', Validators.required],
    });

    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  passwordMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirm = this.registerForm.get('confirmPassword')?.value;
    return password === confirm;
  }

  formAuthActif(userAuthType: UserAuthType): boolean {
    return this.activeForm === userAuthType;
  }

  changeView(formName: UserAuthType) {
    this.activeForm = formName;
  }

  onRegister() {
    this.isSubmitting = true;
    this.userService.registerUser(this.registerForm.value).subscribe((res)=> {
      alert("User registration success");
      this.isSubmitting = false;
      this.registerForm.reset();
      this.activeForm = 'Login';
    }, error => {
      alert(error.error)
      this.isSubmitting = false;
    })
  }

  onLogin(){
    this.isSubmitting = true;
    this.userService.loginUser(this.loginForm.value).subscribe((res)=> {
      alert("User login success");
      this.isSubmitting = false;
      this.loginForm.reset();
    }, error => {
      alert(error.error)
      this.isSubmitting = false;
    })
  }
}
