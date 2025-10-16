import { CreateOrderlistDto } from './dto/create-orderlist.dto';
import { UpdateOrderlistDto } from './dto/update-orderlist.dto';
export declare class OrderlistService {
    create(createOrderlistDto: CreateOrderlistDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderlistDto: UpdateOrderlistDto): string;
    remove(id: number): string;
}
