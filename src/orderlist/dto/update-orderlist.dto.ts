import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderlistDto } from './create-orderlist.dto';
import { IsNumber, Min } from 'class-validator';

export class UpdateOrderlistDto extends PartialType(CreateOrderlistDto) {
  @IsNumber()
  orderId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;
}
