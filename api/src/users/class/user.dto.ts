import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEmail,
  IsDate,
  IsNumber,
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
  phone?: string;

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
  rolId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}

export class updateUser {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  last_Name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDate()
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @MinLength(8)
  @IsOptional()
  pass?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  rolId: string;
}
