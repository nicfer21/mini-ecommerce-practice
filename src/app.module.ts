import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductcreatedService } from './productcreated/productcreated.service';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule, ProductModule, OrderModule, UserModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, ProductcreatedService, UploadService],
})
export class AppModule {}
