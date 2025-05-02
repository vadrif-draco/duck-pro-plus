import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || "";

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && value.length >= 8;

  return valid
    ? null
    : {
        strongPassword: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          hasSpecialChar,
          minLength: value.length >= 8,
        },
      };
}

@Component({
  selector: "app-admin-login",
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Admin Login</h2>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" formControlName="username" [ngClass]="{ invalid: isFieldInvalid('username') }" />
          <div *ngIf="isFieldInvalid('username')" class="error-message">
            <span *ngIf="loginForm.get('username')?.errors?.['required']">Username is required</span>
            <span *ngIf="loginForm.get('username')?.errors?.['minlength']"> Username must be at least 4 characters </span>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" formControlName="password" [ngClass]="{ invalid: isFieldInvalid('password') }" />
          <div *ngIf="isFieldInvalid('password')" class="error-message">
            <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
            <span *ngIf="loginForm.get('password')?.errors?.['strongPassword']">
              Password must contain at least 8 characters, including uppercase, lowercase, number, and special character
            </span>
          </div>
        </div>

        <div class="form-group">
          <button type="submit" [disabled]="loginForm.invalid">Login</button>
        </div>
      </form>

      <div *ngIf="loginError" class="error-message login-error">
        {{ loginError }}
      </div>

      <div class="login-tips">
        <h3>For demonstration purposes:</h3>
        <p>Username: <strong>admin</strong></p>
        <p>Password: <strong>Duck&#64;123</strong></p>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      label {
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      input.invalid {
        border-color: #ff5757;
        background-color: #fff0f0;
      }

      button {
        padding: 12px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s;
      }

      button:hover {
        background: #45a049;
      }

      button:disabled {
        background: #cccccc;
        cursor: not-allowed;
      }

      .error-message {
        color: #ff5757;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }

      .login-error {
        text-align: center;
        padding: 1rem;
        background-color: #ffebeb;
        border-radius: 4px;
        margin-top: 1rem;
      }

      .login-tips {
        margin-top: 2rem;
        padding: 1rem;
        background-color: #e8f5e9;
        border-radius: 4px;
      }

      .login-tips h3 {
        margin-top: 0;
        font-size: 1rem;
        color: #2e7d32;
      }
    `,
  ],
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem("admin_authenticated");

    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, strongPasswordValidator]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    if (username === "admin" && password === "Duck@123") {
      localStorage.setItem("admin_authenticated", "true");
      this.router.navigate(["/admin/dashboard"]);
    } else {
      this.loginError = "Invalid username or password";

      setTimeout(() => {
        this.loginError = null;
      }, 3000);
    }
  }
}
