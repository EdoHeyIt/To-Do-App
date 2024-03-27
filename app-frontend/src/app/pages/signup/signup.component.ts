import { Component, Inject } from "@angular/core";
import { SignupService } from "../../core/services/signup/signup.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})
export class SignupComponent {
  public name = "";
  public password = "";
  public email = "";
  public showSuccessMessage = false;
  public formSubmitted = false;
  public usernameExistsError = "";
  public emailExistError = "";
  public passwordError = "";
  public emailError = "";

  // Validation for email and password
  private readonly emailPattern: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private readonly minPasswordLength: number = 5;

  constructor(
    @Inject(SignupService) private readonly signupService: SignupService
  ) {}

  // Clear errors on form input change
  public onNameChange(): void {
    this.usernameExistsError = "";
  }

  public onPasswordChange(): void {
    this.passwordError = "";
  }

  public onEmailChange(): void {
    this.emailExistError = "";
    this.emailError = "";
  }

  public signup(): void {
    this.checkUsernameExists();
  }

  // Check if name already exists
  private checkUsernameExists(): void {
    this.signupService.isUsernameExists(this.name).subscribe({
      next: (exists) => {
        if (exists) {
          this.usernameExistsError = "Username already exists";
        } else {
          this.validatePassword();
        }
      },
      error: () => {},
    });
  }

  // Validate password length
  private validatePassword(): void {
    if (this.password.length < this.minPasswordLength) {
      this.passwordError = `Must be at least ${this.minPasswordLength} characters`;
    } else {
      this.validateEmail();
    }
  }

  // Validate email format
  private validateEmail(): void {
    if (!this.emailPattern.test(this.email)) {
      this.emailError = "Invalid email format";
    } else {
      this.checkEmailExists();
    }
  }

  // Check if email already exists
  private checkEmailExists(): void {
    this.signupService.isEmailExists(this.email).subscribe({
      next: (emailExists) => {
        if (emailExists) {
          this.emailExistError = "Email already exists";
        } else {
          this.registerUser();
        }
      },
      error: () => {},
    });
  }

  // Register the user
  private registerUser(): void {
    const signupData = {
      name: this.name,
      password: this.password,
      email: this.email,
    };

    this.signupService.signUp(signupData).subscribe({
      next: () => {
        this.formSubmitted = true;
        this.showSuccessMessage = true;
      },
      error: () => {},
    });
  }
}
