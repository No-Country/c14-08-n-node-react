import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class appointmentCreate {
  @IsString()
  @IsNotEmpty()
  idClient: string;
  @IsString()
  @IsNotEmpty()
  idLawyers: string;
  @IsString()
  @IsOptional()
  statusId?: string;
  @IsString()
  @IsNotEmpty()
  hour: string;
  @IsString()
  @IsOptional()
  birthdate?: string;
  @IsString()
  @IsNotEmpty()
  modalityId: string;
  @IsString()
  @IsOptional()
  links?: string;
}
