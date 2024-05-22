import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class EditCartDto {


  @IsOptional()
  readonly UserID?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  products: [string, number][];
}
