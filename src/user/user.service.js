"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const tools_1 = require("../tools");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const encryptedPassword = bcrypt.hashSync(createUserDto.password + process.env.PWT_SECRET, 10);
            const created = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    password: encryptedPassword,
                    role: createUserDto.role,
                },
            });
            return {
                state: true,
                data: {
                    res: created,
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
                ? await this.prisma.user.count({
                    where: {
                        name: { contains: query.search || '', mode: 'insensitive' },
                    },
                })
                : await this.prisma.user.count();
            const { skip, take, orderBy, page, pages, rows, hasNextPage, hasPrevPage, search, } = (0, tools_1.paginationHelper)(query, countRows);
            const find = await this.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
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
            const found = await this.prisma.user.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            const productCreated = await this.prisma.productCreated.count({
                where: { userId: id },
            });
            const orderCreated = await this.prisma.order.count({
                where: { userId: id },
            });
            return {
                state: true,
                data: {
                    res: found,
                    countProductCreated: productCreated,
                    countOrderCreated: orderCreated,
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
    async update(id, updateUserDto) {
        try {
            if (updateUserDto.password) {
                const encryptedPassword = bcrypt.hashSync(updateUserDto.password + process.env.PWT_SECRET, 10);
                updateUserDto.password = encryptedPassword;
            }
            const updatedRow = await this.prisma.user.update({
                where: { id: id },
                data: updateUserDto,
            });
            return {
                state: true,
                data: {
                    res: updatedRow,
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
            await this.prisma.user.delete({
                where: { id: id },
            });
            return {
                state: true,
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map