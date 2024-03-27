import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  Param,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignUpDto } from "src/dto/signup";
import { LoginDto } from "src/dto/login";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // Endpoint for user registration
  @Post("/signup")
  public async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto
  ): Promise<any> {
    try {
      const signUpUser = await this.authenticationService.signUp(signUpDto);
      return signUpUser;
    } catch (error) {
      throw new Error("Registration failed");
    }
  }

  // Endpoint for user login
  @Post("/login")
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      const loginUser = await this.authenticationService.login(loginDto);
      return loginUser;
    } catch (error) {
      throw new Error("Login failed");
    }
  }

  // Endpoint to check if a username already exists
  @Get("check-username/:name")
  public async isUsernameExists(@Param("name") userName: string): Promise<any> {
    const isUsernameExists =
      await this.authenticationService.isUsernameExists(userName);

    return isUsernameExists;
  }

  // Endpoint to check if an email address already exists
  @Get("check-email/:email")
  public async isEmailExists(@Param("email") userEmail: string): Promise<any> {
    const isEmailExists =
      await this.authenticationService.isEmailExists(userEmail);

    return isEmailExists;
  }

  // Endpoint to get user details
  @Get("user/:id")
  public async getUser(@Param("id") userId: string): Promise<any> {
    const user = await this.authenticationService.getUser(userId);
    return { user };
  }
}
