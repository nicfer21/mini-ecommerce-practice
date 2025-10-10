import { Injectable } from '@nestjs/common';
import { CreateProductcreatedDto } from './dto/create-productcreated.dto';
import { UpdateProductcreatedDto } from './dto/update-productcreated.dto';

@Injectable()
export class ProductcreatedService {
  create(createProductcreatedDto: CreateProductcreatedDto) {
    return 'This action adds a new productcreated';
  }

  findAll() {
    return `This action returns all productcreated`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productcreated`;
  }

  update(id: number, updateProductcreatedDto: UpdateProductcreatedDto) {
    return `This action updates a #${id} productcreated`;
  }

  remove(id: number) {
    return `This action removes a #${id} productcreated`;
  }
}
