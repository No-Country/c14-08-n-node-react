import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEmail,
  IsDate,
} from 'class-validator';
export class createUser {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  last_Name?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  Phone?: string;

  @IsDate()
  @MinLength(4)
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  pass: string;

  @IsString()
  @IsNotEmpty()
  IdRol: string;
}
