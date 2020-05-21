import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export interface AuthPayload {
  email: string;
}

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  fullName: string;

  @IsString()
  dob: Date;

  @IsOptional()
  avatar: string;
}
