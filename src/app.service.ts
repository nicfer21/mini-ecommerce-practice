import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<Record<string, string>> {
    try {
      return {
        message: await this.prisma.$queryRaw`SELECT 'Hello World!'`,
      };
    } catch (error) {
      return { error: 'Database query failed' };
    }
  }
}
