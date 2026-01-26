import { DataSource } from 'typeorm';
import { EmailResponse, EmailError } from 'src/notifications/entity';
import { Services, Category, Pricing, Types } from 'src/services/entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { Order } from 'src/order/order.entity';
import { UsersSettings } from 'src/users-settings/user-setting.entity';

export const AppDataSource = new DataSource({
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

  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
