import { IsNumber, IsPositive } from 'class-validator';

export class CreateProductcreatedDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  userId: number;
}
