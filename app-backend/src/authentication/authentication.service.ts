import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { type LoginDto } from "src/dto/login";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  // Method for user registration
  public async signUp(signUp: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ token: string; userName: string }> {
    try {
      const { name, email, password } = signUp;

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      // Generate a JWT token for the new user
      const token = this.jwtService.sign({ id: user._id });
      return { token, userName: user.name };
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  // Method for user login
  public async login(loginDto: LoginDto): Promise<any> {
    try {
      const { name, password } = loginDto;

      // Find the user in the database by username
      const user = await this.userModel.findOne({ name });

      if (user == null) {
        throw new UnauthorizedException("User does not exist");
      }

      // Check if the provided password matches the stored hashed password
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        throw new UnauthorizedException("Password is not correct");
      }

      // Generate a JWT token for the authenticated user
      const token = this.jwtService.sign({ id: user._id });
      return { token, userName: user.name, UserId: user._id };
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  // Check if a username already exists
  public async isUsernameExists(username: string): Promise<any> {
    try {
      const existingUser = await this.userModel.findOne({ name: username });

      return !(existingUser == null);
    } catch (error) {
      throw new Error("User not found");
    }
  }

  // Check if an email address already exists
  public async isEmailExists(email: string): Promise<any> {
    try {
      const existingEmail = await this.userModel.findOne({ email });

      return !(existingEmail == null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get user details by username
  public async getUser(userId: string): Promise<any> {
    try {
      const user = await this.userModel.findById(userId);

      if (user == null) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      return null;
    }
  }
}
