"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
const tools_1 = require("../tools");
let ProductService = class ProductService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async create(createProductDto, file) {
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
        }
        catch (error) {
            return {
                state: false,
                data: {
                    res: error.message,
                },
            };
        }
    }
    async findAll(query) {
        try {
            const countRows = query.search
                ? await this.prisma.product.count({
                    where: {
                        name: { contains: query.search || '', mode: 'insensitive' },
                    },
                })
                : await this.prisma.product.count();
            const { skip, take, orderBy, page, pages, rows, hasNextPage, hasPrevPage, search, } = (0, tools_1.paginationHelper)(query, countRows);
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
        }
        catch (error) {
            return {
                state: false,
                data: {
                    res: error.message,
                },
            };
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.product.findFirstOrThrow({
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
        }
        catch (error) {
            return {
                state: false,
                data: {
                    res: error.message,
                },
            };
        }
    }
    async findImage(fileName, res) {
        try {
            const { state, path } = this.uploadService.findImage(fileName);
            if (state) {
                res.sendFile(path);
            }
            else {
                res.status(404).send({
                    state: false,
                    data: {
                        res: 'Error al enviar la imagen',
                    },
                });
            }
        }
        catch (error) {
            res.status(404).sendJson({
                state: false,
                data: {
                    res: error.message,
                },
            });
        }
    }
    async update(id, updateProductDto, file) {
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
                }
                catch (error) {
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
        }
        catch (error) {
            return {
                state: false,
                data: {
                    res: error.message,
                },
            };
        }
    }
    async remove(id) {
        try {
            const deleteProduct = await this.prisma.product.delete({
                where: {
                    id: id,
                },
            });
            this.uploadService.deleteImage(deleteProduct.imageUrl || '').state
                ? console.log('Image deleted')
                : console.log('No image to delete');
            return deleteProduct;
        }
        catch (error) {
            return {
                state: false,
                data: {
                    res: error.message,
                },
            };
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ProductService);
//# sourceMappingURL=product.service.js.map