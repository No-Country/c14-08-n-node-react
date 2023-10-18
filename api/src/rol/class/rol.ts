import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateRol {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}

export class UpdateRol {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;
}
