import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParams } from 'src/types';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        state: boolean;
        data: {
            res: any;
        };
    }>;
    findAll(query: QueryParams): Promise<{
        state: boolean;
        data: {
            res: {
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                email: string;
                role: import("@prisma/client").$Enums.Role;
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
    findOne(id: number): Promise<{
        state: boolean;
        data: {
            res: {
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            } | null;
            countProductCreated: number;
            countOrderCreated: number;
        };
    } | {
        state: boolean;
        data: {
            res: any;
            countProductCreated?: undefined;
            countOrderCreated?: undefined;
        };
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        state: boolean;
        data: {
            res: any;
        };
    }>;
    remove(id: number): Promise<{
        state: boolean;
        data?: undefined;
    } | {
        state: boolean;
        data: {
            res: any;
        };
    }>;
}
