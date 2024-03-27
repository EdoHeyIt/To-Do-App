import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../core/services/login/login.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { LoginResponse } from "../../core/interfaces/login/login-response";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  public name: string = "";
  public password: string = "";
  public loginError: string = "";

  constructor(
    private readonly router: Router,
    private readonly logInService: LoginService,
    private readonly authService: AuthService
  ) {}

  // Clear login error on form input change
  public onChange(): void {
    this.loginError = "";
  }

  // Handle login process
  public login(): void {
    const loginData = {
      name: this.name,
      password: this.password,
    };

    // Subscribe to login service
    this.logInService.logIn(loginData).subscribe({
      next: (response: LoginResponse) => {
        const userId = response.UserId;
        this.authService.login(userId);
        void this.router.navigate(["/user"]);
      },
      error: () => {
        this.loginError = "Invalid username or password";
      },
    });
  }
}
