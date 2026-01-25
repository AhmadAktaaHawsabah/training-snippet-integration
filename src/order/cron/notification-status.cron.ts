import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { OrderService } from '../order.service';
@Injectable()
export class RetriesSendingNotification {
    private readonly logger = new Logger(RetriesSendingNotification.name);

    constructor(private readonly ordersService: OrderService) { }

    @Cron(CronExpression.EVERY_2_HOURS)
    async handle() {
        const count = await this.ordersService.retrySendingNotifications();
        this.logger.log(`Retry notifications sent: ${count}`);
    }
}
