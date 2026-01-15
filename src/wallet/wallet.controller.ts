import { Controller, Post, Param, Body, UseGuards, Get } from '@nestjs/common';
import { AddCreditDto } from './dtos/add-credits';
import { WalletService } from './wallet.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators';
import { UserRole } from 'src/auth/enums/user-role.enum';

@Controller('wallet')
export class WalletController {
    constructor(private service: WalletService) { }
    
    @Post(':userId/add-credits')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async addCredits(@Param('userId') userId: string, @Body() addCreditDto: AddCreditDto) {
        return await this.service.addCredits(+userId, addCreditDto);
    }

}
