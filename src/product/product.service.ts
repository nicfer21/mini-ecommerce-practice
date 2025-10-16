import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { QueryParams } from 'src/types';
import { paginationHelper } from 'src/tools';

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
        where: { id: created.id },
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

  async findAll(query: QueryParams) {
    try {
      const countRows = query.search
        ? await this.prisma.product.count({
            where: {
              name: { contains: query.search || '', mode: 'insensitive' },
            },
          })
        : await this.prisma.product.count();

      const {
        skip,
        take,
        orderBy,
        page,
        pages,
        rows,
        hasNextPage,
        hasPrevPage,
        search,
      } = paginationHelper(query, countRows);

      const find = await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
        skip: skip,
        take: take,
        orderBy: { id: orderBy ? 'asc' : 'desc' },
        where: { name: { contains: search, mode: 'insensitive' } },
      });

      return {
        state: true,
        data: {
          res: find,
        },
        pagination: {
          countRows: countRows,
          rowsPage: rows,
          countPages: pages,
          currentPage: page,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          search: search,
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

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          ProductCreated: {
            include: {
              User: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      return {
        state: true,
        data: {
          res: product,
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

  async findImage(fileName: string, res: any) {
    try {
      const { state, path } = this.uploadService.findImage(fileName);
      if (state) {
        res.sendFile(path);
      } else {
        res.status(404).send({
          state: false,
          data: {
            res: 'Error al enviar la imagen',
          },
        });
      }
    } catch (error) {
      res.status(404).sendJson({
        state: false,
        data: {
          res: error.message,
        },
      });
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    try {
      let imageChange = false;
      let updateCreatedProduct = {};
      const update = await this.prisma.product.update({
        where: { id: id },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: updateProductDto.price,
          quantity: updateProductDto.quantity,
        },
      });

      const rowProductCreated = await this.prisma.productCreated.findFirst({
        where: { productId: update.id },
      });

      if (rowProductCreated?.id) {
        updateCreatedProduct = await this.prisma.productCreated.update({
          where: {
            id: rowProductCreated.id,
          },
          data: {
            productId: update.id,
            userId: updateProductDto.userId,
          },
        });
      }

      if (file) {
        try {
          this.uploadService.deleteImage(update.imageUrl || '').state
            ? console.log('Image deleted')
            : console.log('No image to delete');

          const { fileName, path } = await this.uploadService.uploadImage(file);

          const updatedProduct = await this.prisma.product.update({
            where: { id: update.id },
            data: {
              imageUrl: fileName,
            },
          });
          imageChange = true;
          console.log('Updated image');
        } catch (error) {
          return {
            state: false,
            data: {
              res: error.message,
            },
          };
        }
      }

      return {
        state: true,
        data: {
          res: update,
          resUpdateCreatedProduct: updateCreatedProduct,
          imageChange: imageChange,
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

  async remove(id: number) {
    try {
      const deleteProduct = await this.prisma.product.delete({
        where: {
          id: id,
        },
      });

      this.uploadService.deleteImage(deleteProduct.imageUrl || '').state
        ? console.log('Image deleted')
        : console.log('No image to delete');

      return {
        state: true,
        data: {
          res: deleteProduct,
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
}
