import { Module } from '@nestjs/common';
import { OrderlistService } from './orderlist.service';

@Module({
  providers: [OrderlistService],
})
export class OrderlistModule {}
