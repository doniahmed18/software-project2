import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class EditOrderDto {
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly UserID?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  readonly products?: [string, number][];

  @IsOptional()
  @IsNumber()
  readonly total?: number;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;


}

