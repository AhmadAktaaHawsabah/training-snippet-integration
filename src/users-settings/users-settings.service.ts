import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadGatewayException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersSettings } from './user-setting.entity';
import { updateUserSettingDto } from './dto/updateUserSetting';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserSettingService {
    constructor(@InjectRepository(UsersSettings) private UserSettingRepo: Repository<UsersSettings>,
        private userService: UsersService) { }

    async updateUserSetting(id: number, dto: updateUserSettingDto) {
        
        const user = await this.userService.findOne(id)
        if (!user)
            throw new NotFoundException('sorry  we can not  find this user  ')


        const userSetting = await this.UserSettingRepo.findOne({ where: { user: { id } } });
        if (!userSetting)
            throw new NotFoundException('sorry  we can not  find this user  ')

        Object.assign(userSetting, dto);
        return this.UserSettingRepo.save(userSetting);
    }



    async getByUserId(userId: number) {
        const user = this.UserSettingRepo.findOne({ where: { userId } })
        if (!user) {
            throw new NotFoundException('user not  found')
        }
        return user;
    }

    async addUserSetting(id: number, dto: updateUserSettingDto) {
        const user = await this.userService.findOne(id)
        if (!user) {
            throw new NotFoundException('User not  found')
        }

        const userSetting = this.UserSettingRepo.create({ userId: id })
        return this.UserSettingRepo.save(userSetting)
    }

}