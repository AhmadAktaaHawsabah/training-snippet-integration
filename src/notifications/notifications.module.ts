import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { UserSettingService } from 'src/users-settings/users-settings.service';
import { HttpWrapperService } from 'src/utils/http.util';
import { UsersSettingsModule } from 'src/users-settings/users-settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailResponse, EmailError } from './entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailResponse, EmailError]),
    UsersSettingsModule,
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationsModule {}
