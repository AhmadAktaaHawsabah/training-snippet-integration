import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { orderSubscriber } from './subscriber/orderSubscriber';
import { OrderAutoApproveCron } from './cron/order-auto-approve.cron';
import { NotificationService } from 'src/notifications/notifications.service';
import { UsersSettingsModule } from 'src/users-settings/users-settings.module';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';


@Module({
  imports: [TypeOrmModule.forFeature([Order]),
    AuthModule, WalletModule, ProductsModule  , UsersSettingsModule , UsersModule , NotificationsModule],
  controllers: [OrderController],
  providers: [OrderService, orderSubscriber, OrderAutoApproveCron   ],
  exports: [OrderService]
})

export class OrderModule { } 

