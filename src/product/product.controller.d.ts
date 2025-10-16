import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { QueryParams } from 'src/types';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(file: Express.Multer.File, createProductDto: CreateProductDto): Promise<{
        state: boolean;
        data: {
            res: {
                name: string;
                description: string | null;
                price: number;
                quantity: number;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            resCreatedProduct: {
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                productId: number;
            };
            resUpdateProduct: {
                name: string;
                description: string | null;
                price: number;
                quantity: number;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        };
    } | {
        state: boolean;
        data: {
            res: any;
            resCreatedProduct?: undefined;
            resUpdateProduct?: undefined;
        };
    }>;
    findAll(query: QueryParams): Promise<{
        state: boolean;
        data: {
            res: {
                name: string;
                description: string | null;
                price: number;
                quantity: number;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            }[];
        };
        pagination: {
            countRows: number;
            rowsPage: number;
            countPages: number;
            currentPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            search: string;
        };
    } | {
        state: boolean;
        data: {
            res: any;
        };
        pagination?: undefined;
    }>;
    findOne(id: string): Promise<({
        ProductCreated: ({
            User: {
                name: string;
                id: number;
                role: import("@prisma/client").$Enums.Role;
            };
        } & {
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            productId: number;
        })[];
    } & {
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }) | {
        state: boolean;
        data: {
            res: any;
        };
    }>;
    findImage(name: string, res: Response): Promise<void>;
    update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File): Promise<{
        state: boolean;
        data: {
            res: any;
            resUpdateCreatedProduct?: undefined;
            imageChange?: undefined;
        };
    } | {
        state: boolean;
        data: {
            res: {
                name: string;
                description: string | null;
                price: number;
                quantity: number;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            resUpdateCreatedProduct: {};
            imageChange: boolean;
        };
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | {
        state: boolean;
        data: {
            res: any;
        };
    }>;
}
