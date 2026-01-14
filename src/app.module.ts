import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      entities: [User, Product , Wallet ,Order ],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    AdminModule,
    ProductsModule,
    WalletModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
