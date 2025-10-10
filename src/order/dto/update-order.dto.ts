import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  userId?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  tax?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  total?: number;
}
