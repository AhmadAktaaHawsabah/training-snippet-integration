import { notificationPreference } from "../enum/notification_preference";
import { IsString, IsEnum } from "class-validator";

export class updateUserSettingDto {

    @IsEnum({ enum: notificationPreference })
    notificationPreference: notificationPreference;
}