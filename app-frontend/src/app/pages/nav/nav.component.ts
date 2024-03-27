import { Component, Inject, type OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent implements OnInit {
  constructor(
    @Inject(Router) private readonly router: Router,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  // Track user's login status
  public isLoggedIn: boolean = false;

  ngOnInit(): void {
    // Subscribe to the authService's isLoggedIn$ observable
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Navigate to the login page
  navigateToLogin(): void {
    void this.router.navigate(["/login"]);
  }

  // Navigate to the signup page
  navigateToSignup(): void {
    void this.router.navigate(["/signup"]);
  }

  // Logout the user and navigate to the home page
  logout(): void {
    this.authService.logout();
  }
}
