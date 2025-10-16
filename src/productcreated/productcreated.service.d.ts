import { CreateProductcreatedDto } from './dto/create-productcreated.dto';
import { UpdateProductcreatedDto } from './dto/update-productcreated.dto';
export declare class ProductcreatedService {
    create(createProductcreatedDto: CreateProductcreatedDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductcreatedDto: UpdateProductcreatedDto): string;
    remove(id: number): string;
}
