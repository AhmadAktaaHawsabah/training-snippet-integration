import { IsString, IsInt, IsEmail, IsOptional, IsArray } from 'class-validator';

export class SendEmailNotificationDto {
    @IsEmail()
    fromEmail: string;

    @IsEmail()
    toEmail: string;

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    ccList?: string[];

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    bcList?: string[];

    @IsString()
    title: string;

    @IsString()
    message: string;
}


