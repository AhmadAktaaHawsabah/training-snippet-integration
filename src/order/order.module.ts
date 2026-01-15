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


@Module({
  imports: [TypeOrmModule.forFeature([Order]),
    AuthModule, WalletModule, ProductsModule],
  controllers: [OrderController],
  providers: [OrderService, orderSubscriber, OrderAutoApproveCron],
  exports: [OrderService]
})
export class OrderModule { }
