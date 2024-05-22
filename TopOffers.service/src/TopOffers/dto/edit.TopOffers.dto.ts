// edit-TopOffers.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class EditTopOffersDto {
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly TopOffersDescription?: string;

  @IsOptional()
  // Add validation rules for other fields as needed
  @IsOptional()
  @IsString()
  readonly TopOffersName?: String;


  @IsOptional()
  @IsString()
  readonly TopOffersImage?: String;

  @IsOptional()
  @IsString()
  readonly TopOffersPrice?: Number;

  @IsOptional()
  @IsString()
  readonly TopOffersSpecifications?: String;

  @IsOptional()
  @IsString()
  readonly TopOffersAvailability?: String;
}
