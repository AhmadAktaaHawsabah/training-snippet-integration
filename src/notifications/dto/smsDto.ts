import { IsString, IsInt, IsEmail, IsNumber, IsDate } from 'class-validator';

export class SendSmsNotificationDto {

    @IsString()
    fromPhoneNumber: string;

    @IsString()
    toPhoneNumber: string;

    @IsString()
    message: string;
}


