import { Injectable } from '@nestjs/common';
import { UserSettingService } from 'src/users-settings/users-settings.service';
import { Order } from '../order/order.entity';
import { User } from 'src/users/users.entity';
import { notificationStatus } from '../order/eums/notification-status';
import { notificationPreference } from 'src/users-settings/enum/notification_preference';
import { SendSmsNotificationDto } from './dto/smsDto';
import { SendEmailNotificationDto } from './dto/emailDto';
import { HttpWrapperService } from 'src/utils/http.util';
import { EmailResponse, EmailError } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorType } from './enum/error-type';
import { renderTemplate } from 'src/utils/template';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(
    private userSettingService: UserSettingService,
    @InjectRepository(EmailError)
    private emailErrorRepo: Repository<EmailError>,
        private readonly config: ConfigService,
    @InjectRepository(EmailResponse)
    private emailResponseRepo: Repository<EmailResponse>,
  ) {}

  async sendEmail(dto: SendEmailNotificationDto): Promise<notificationStatus> {
    try {

      const baseUrl = this.config.get<string>('NOTIFICATION_URL');
      const https: any = await HttpWrapperService(
        'post',
        'NOTIFICATION_URL',
        'notifications/email',
        { data: dto },
      );

      const data = https.data ?? {
        success: true,
        statusCode: 200,
        message: 'Email sent',
      };

      // store response
      await this.storeEmailResponse({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        errorType: data.success
          ? undefined
          : data.statusCode >= 500
            ? 'SERVER'
            : 'CLIENT',
      });

      return notificationStatus.SENT;
    } catch (error) {
      const statusCode = error?.response?.status ?? 500;
      const message = error?.response?.data?.message || error.message;
      await this.storeEmailResponse({
        success: false,
        statusCode,
        message,
        errorType: statusCode >= 500 ? 'SERVER' : 'CLIENT',
      });

      return notificationStatus.NOT_SENT;
    }
  }

  async storeEmailResponse(data: {
    success: boolean;
    statusCode: number;
    errorType?: 'CLIENT' | 'SERVER';
    message?: string;
  }) {
    const entity = this.emailResponseRepo.create({
      success: data.success,
    });

    const savedResponse = await this.emailResponseRepo.save(entity);

    if (!data.success) {
      const errorEntity = this.emailErrorRepo.create({
        response: savedResponse,
        statusCode: data.statusCode,
        errorType: data.errorType
          ? data.errorType === 'SERVER'
            ? ErrorType.SERVER
            : ErrorType.CLIENT
          : data.statusCode >= 500
            ? ErrorType.SERVER
            : ErrorType.CLIENT,
        message: data.message || 'Unknown error',
      });
      const savedError = await this.emailErrorRepo.save(errorEntity);
    }
  }

  async sendSms(dto: SendSmsNotificationDto): Promise<notificationStatus> {
    try {
      await HttpWrapperService(
        'post',
        'NOTIFICATION_URL',
        'notifications/sms',
        { data: dto },
      );
      return notificationStatus.SENT;
    } catch {
      return notificationStatus.NOT_SENT;
    }
  }

  async sendNotification(
    order: Order,
    user: User,
  ): Promise<notificationStatus> {
    try {
      const userSetting = await this.userSettingService.getByUserId(user.id);
      const preference = userSetting?.notificationPreference;

      if (preference === notificationPreference.NONE) {
        return notificationStatus.NO_CONTACT;
      }
      if (
        (preference === notificationPreference.EMAIL ||
          preference === notificationPreference.ALL) &&
        user.email
      ) {
        const htmlContent = renderTemplate('email-templates', {
          userName: user.firstName,
          orderId: order.id,
        });

        return await this.sendEmail({
          fromEmail: process.env.FROM_EMAIL!,
          toEmail: user.email,
          title: 'Order Purchased',
          message: htmlContent,
        });
      }

      if (
        (preference === notificationPreference.SMS ||
          preference === notificationPreference.ALL) &&
        user.phoneNumber
      ) {
        if (!user.phoneNumber) {
          return notificationStatus.NO_CONTACT;
        }

        return await this.sendSms({
          fromPhoneNumber: process.env.FROM_PHONE!,
          toPhoneNumber: user.phoneNumber,
          message: `Your order #${order.id} was purchased successfully`,
        });
        return notificationStatus.NOT_SENT;
      }
      return notificationStatus.NO_CONTACT;
    } catch (error) {
      return notificationStatus.NOT_SENT;
    }
  }
}
``;
