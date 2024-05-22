// edit-product.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class EditProductDto {
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly ProductDescription?: string;

  @IsOptional()
  // Add validation rules for other fields as needed
  @IsOptional()
  @IsString()
  readonly ProductName?: String;


  @IsOptional()
  @IsString()
  readonly ProductImage?: String;

  @IsOptional()
  @IsString()
  readonly ProductPrice?: Number;

  @IsOptional()
  @IsString()
  readonly ProductSpecifications?: String;

  @IsOptional()
  @IsString()
  readonly ProductAvailability?: String;
}
