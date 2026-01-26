import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/users.entity';
import { Product } from './products/products.entity';
import { WalletModule } from './wallet/wallet.module';
import { OrderModule } from './order/order.module';
import { Wallet } from './wallet/wallet.entity';
import { Order } from './order/order.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersSettings } from './users-settings/user-setting.entity';
import { UsersSettingsController } from './users-settings/users-settings.controller';
import { UsersSettingsModule } from './users-settings/users-settings.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EmailResponse, EmailError } from './notifications/entity';
import { Services, Category, Pricing, Types } from './services/entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'CreditManagement',
      entities: [
        User,
        Product,
        Wallet,
        Order,
        UsersSettings,
        EmailResponse,
        EmailError,
        Services,
        Category,
        Pricing,
        Types,
      ],
      synchronize: false,
      migrationsRun: true,
    }),
    UsersModule,
    AuthModule,
    AdminModule,
    ProductsModule,
    WalletModule,
    OrderModule,
    UsersSettingsModule,
    NotificationsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
