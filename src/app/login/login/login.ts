import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  loginForm!: FormGroup;

  constructor() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, this.userNameValidator]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.router.navigate(['/home']);
    } else {
      this.loginForm.reset();
    }
  }

  private userNameValidator(control: any) {
    return control.value?.toLowerCase() === 'test' ? null : { invalidUserName: true };
  }

  private passwordValidator(control: any) {
    return control.value?.toLowerCase() === 'test123' ? null : { invalidPassword: true };
  }
}
