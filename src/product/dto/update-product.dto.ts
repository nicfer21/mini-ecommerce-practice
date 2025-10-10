import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsString()
  @MaxLength(500)
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(10000)
  @IsPositive()
  price?: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  quantity?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsPositive()
  userId?: number;
}
