import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class EditProfileDto {

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly First_Name: string;

  @IsString()
  readonly Last_Name: string;

  @IsString()
  readonly Email: string;

  @IsString()
  readonly Phone_Number: string;

  @IsString()
  readonly Company: string;

  @IsString()
  readonly Address: string;
  @IsString()
  readonly Payment: string;

}
