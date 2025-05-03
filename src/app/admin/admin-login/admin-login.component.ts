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
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"],
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Check if already authenticated and redirect to dashboard if true
    if (localStorage.getItem("admin_authenticated") === "true") {
      this.router.navigate(["/admin/dashboard"]);
      return;
    }

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
