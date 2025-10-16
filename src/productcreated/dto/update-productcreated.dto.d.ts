import { CreateProductcreatedDto } from './create-productcreated.dto';
declare const UpdateProductcreatedDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductcreatedDto>>;
export declare class UpdateProductcreatedDto extends UpdateProductcreatedDto_base {
    productId?: number;
    userId?: number;
}
export {};
