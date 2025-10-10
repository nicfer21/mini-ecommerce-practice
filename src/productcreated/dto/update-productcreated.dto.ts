import { PartialType } from '@nestjs/mapped-types';
import { CreateProductcreatedDto } from './create-productcreated.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductcreatedDto extends PartialType(
  CreateProductcreatedDto,
) {
  @IsNumber()
  @IsPositive()
  productId?: number;

  @IsNumber()
  @IsPositive()
  userId?: number;
}
