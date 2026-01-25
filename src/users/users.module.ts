import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { Wallet } from 'src/wallet/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User , Wallet]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}