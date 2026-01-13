import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';
import { WalletService } from '../wallet/wallet.service';
import { AddCreditsDto } from './dto/add-credits.dto';

@Controller('admin/wallets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminWalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':userId/add-credits')
  addCredits(@Param('userId') userId: string, @Body() dto: AddCreditsDto) {
    return this.walletService.adminAddCredits(Number(userId), dto.amount);
  }
}