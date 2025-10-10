import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  tax: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;
}
