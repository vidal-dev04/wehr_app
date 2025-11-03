import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string; // Accepte email OU username

  @IsString()
  @MinLength(6)
  password: string;
}
