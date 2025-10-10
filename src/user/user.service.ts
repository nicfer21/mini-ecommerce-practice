import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParams } from 'src/types';
import * as bcrypt from 'bcrypt';
import { paginationHelper } from 'src/tools';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const encryptedPassword = bcrypt.hashSync(
        createUserDto.password + process.env.PWT_SECRET,
        10,
      );

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
      //en caso que venga search
      const countRows = query.search
        ? await this.prisma.user.count({
            where: {
              name: { contains: query.search || '', mode: 'insensitive' },
            },
          })
        : await this.prisma.user.count();

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
    } catch (error) {
      return {
        state: false,
        data: {
          res: error.message,
        },
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        const encryptedPassword = bcrypt.hashSync(
          updateUserDto.password + process.env.PWT_SECRET,
          10,
        );
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
      await this.prisma.user.delete({
        where: { id: id },
      });

      return {
        state: true,
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
