import { CreateOrderlistDto } from './create-orderlist.dto';
declare const UpdateOrderlistDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderlistDto>>;
export declare class UpdateOrderlistDto extends UpdateOrderlistDto_base {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
}
export {};
