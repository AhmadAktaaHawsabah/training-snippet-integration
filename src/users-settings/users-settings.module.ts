import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSettings } from './user-setting.entity';
import { UsersSettingsController } from './users-settings.controller';
import { UserSettingService } from './users-settings.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersSettings]), UsersModule],
    controllers: [UsersSettingsController],
    providers: [UserSettingService ],
    exports: [UserSettingService]
})
export class UsersSettingsModule { }
