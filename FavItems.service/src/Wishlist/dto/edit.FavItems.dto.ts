import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class EditFavItemsDto {
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly UserID?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  readonly products?: [string, number][];
}
