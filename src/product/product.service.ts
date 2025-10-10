import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    try {
      const created = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          quantity: createProductDto.quantity,
        },
      });

      const createdProduct = await this.prisma.productCreated.create({
        data: {
          productId: created.id,
          userId: createProductDto.userId,
        },
      });

      const { fileName, path } = await this.uploadService.uploadImage(file);

      if (!fileName) {
        Error;
        ('Error al subir la imagen');
      }

      const updatedProduct = await this.prisma.product.update({
        where: { id: createProductDto.userId },
        data: {
          imageUrl: fileName,
        },
      });

      return {
        state: true,
        data: {
          res: created,
          resCreatedProduct: createdProduct,
          resUpdateProduct: updatedProduct,
        },
      };
    } catch (error) {
      return {
        state: false,
        data: {
          res: error.message,
        },
      };
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
