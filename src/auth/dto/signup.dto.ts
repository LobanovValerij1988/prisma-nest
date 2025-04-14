import { IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @Length(2, 100)
  email!: string;

  @IsString()
  @Length(6, 255)
  password!: string;

  @IsString()
  passwordConfirm!: string;

  @IsString()
  @Length(1, 50)
  userName!: string;

  @IsOptional()
  @IsInt()
  roleId?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  googleId?: string;
}
