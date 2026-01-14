import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from './eums/order-status.enum';
import { ProductsService } from '../products/products.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private productsService: ProductsService,
        private walletService: WalletService,
    ) { }

    async createOrder(userId: number, productId: number): Promise<Order> {
        const [product, wallet] = await Promise.all([
            this.productsService.findOne(productId),
            this.walletService.findOne(userId),
        ]);

        if (wallet.balance < product.price) {
            throw new BadRequestException('Insufficient wallet balance');
        }

        const order = this.orderRepository.create({
            userId,
            productId,
            amount: product.price,
            status: OrderStatus.PENDING,
        });

        return await this.orderRepository.save(order);
    }

    async findAllPending(page: number = 1, limit: number = 10): Promise<{ orders: Order[]; total: number; page: number; totalPages: number }> {
        const [orders, total] = await this.orderRepository.findAndCount({
            where: { status: OrderStatus.PENDING },
            relations: ['user', 'product'],
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            orders,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(orderId: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['user', 'product'],
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }

        return order;
    }

    async approveOrder(orderId: number): Promise<Order> {
        const order = await this.findOne(orderId);

        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException(`Order is already ${order.status}`);
        }

        const wallet = await this.walletService.findOne(order.userId);

        if (wallet.balance < order.amount) {
            throw new BadRequestException('Insufficient wallet balance');
        }

        wallet.balance = wallet.balance - order.amount;
        await this.walletService.updateBalance(order.userId, wallet.balance);

        order.status = OrderStatus.APPROVED;
        order.approvedAt = new Date();

        return await this.orderRepository.save(order);
    }

    async rejectOrder(orderId: number): Promise<Order> {
        const order = await this.findOne(orderId);

        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException(`Order is already ${order.status}`);
        }

        order.status = OrderStatus.REJECTED;

        return await this.orderRepository.save(order);
    }
}