import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class activate {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
