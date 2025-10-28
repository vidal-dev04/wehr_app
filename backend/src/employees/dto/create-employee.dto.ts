import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { EmploymentStatus, Gender } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsString()
  position: string;

  @IsDateString()
  hireDate: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsEnum(EmploymentStatus)
  status?: EmploymentStatus;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsUUID()
  departmentId?: string;
}
