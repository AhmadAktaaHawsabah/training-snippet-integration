import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @IsPositive({ message: 'Product ID must be a positive number' })
    productId: number;
}