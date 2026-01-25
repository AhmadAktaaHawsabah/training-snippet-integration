import { Controller, Post, Body, Put, Patch, Get, Param } from '@nestjs/common';
import { UserSettingService } from './users-settings.service';
import { updateUserSettingDto } from './dto/updateUserSetting';

@Controller('usersSettings')
export class UsersSettingsController {
    constructor(private userSettingService: UserSettingService) { }


    @Get('/:id')
    async GetUserSetting(@Param('id') id: string) {
        return await this.userSettingService.getByUserId(+id);
    }

    @Post(':id/user')
    async addSetting(@Param('id') id: string, @Body() dto: updateUserSettingDto) {
        return await this.userSettingService.addUserSetting(+id, dto);
    }
    @Patch(':id/user')
    async updateSetting(@Param('id') id: string, @Body() dto: updateUserSettingDto) {
        return await this.userSettingService.updateUserSetting(+id, dto);
    }


}



