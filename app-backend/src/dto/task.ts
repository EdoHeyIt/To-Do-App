import { IsNotEmpty, IsString } from "class-validator";

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  readonly status: string;
}
