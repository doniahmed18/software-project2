import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class EditCouponDto {

  @IsString()
  readonly name: string;

  @IsString()
  readonly value: Number;


}
