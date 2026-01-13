import { Module } from '@nestjs/common';
import { WalletModule } from 'src/wallet/wallet.module';
import { AdminWalletController } from './admin-wallet.controller';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModule } from 'src/order/order.module';
import { AdminOrderController } from './admin-order.controller';

@Module({
  imports: [AuthModule, WalletModule, OrderModule],
  controllers: [AdminWalletController, AdminOrderController],
})
export class AdminDashboardModule {}