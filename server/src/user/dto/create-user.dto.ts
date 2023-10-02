import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: "Ваш пароль слишком короткий" })
  password: string;
}
