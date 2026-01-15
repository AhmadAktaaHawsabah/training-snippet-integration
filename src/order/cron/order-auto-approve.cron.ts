import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { OrderService } from '../order.service';

@Injectable()
export class OrderAutoApproveCron {
    private readonly logger = new Logger(OrderAutoApproveCron.name);

    constructor(private readonly ordersService: OrderService) { }

    @Cron('0 * * * *') 
    async handle() {
        const count = await this.ordersService.autoApproveExpiredOrders();
        this.logger.log(`Auto-approved ${count} orders`);
    }
}
