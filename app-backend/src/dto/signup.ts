import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
