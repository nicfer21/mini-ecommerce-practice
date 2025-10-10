import { Module } from '@nestjs/common';
import { ProductcreatedService } from './productcreated.service';

@Module({
  providers: [ProductcreatedService],
})
export class ProductcreatedModule {}
