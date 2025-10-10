import { Injectable } from '@nestjs/common';
import { CreateOrderlistDto } from './dto/create-orderlist.dto';
import { UpdateOrderlistDto } from './dto/update-orderlist.dto';

@Injectable()
export class OrderlistService {
  create(createOrderlistDto: CreateOrderlistDto) {
    return 'This action adds a new orderlist';
  }

  findAll() {
    return `This action returns all orderlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderlist`;
  }

  update(id: number, updateOrderlistDto: UpdateOrderlistDto) {
    return `This action updates a #${id} orderlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderlist`;
  }
}
