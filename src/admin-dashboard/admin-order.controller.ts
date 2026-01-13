import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';
import { OrderService } from 'src/order/order.service';


@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.adminfindAll();
  }

  @Post(':orderId/approve')
  approve(@Param('orderId') orderId: string) {
    return this.orderService.adminApproveOrder(Number(orderId));
  }

  @Post(':orderId/reject')
  reject(@Param('orderId') orderId: string) {
    return this.orderService.adminRejectOrder(Number(orderId));
  }
}