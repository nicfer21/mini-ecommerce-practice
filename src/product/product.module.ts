import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, UploadModule],
})
export class ProductModule {}
