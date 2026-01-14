import { Controller, Post, Get, Param, Body, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';
import { CurrentUser } from '../decorators/current-user.decorator';
import * as currentUserType from '../common/types/current-user.type';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUserId } from 'src/decorators';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post()
    @Roles(UserRole.USER)
    async createOrder(@CurrentUserId() currentUserId: number, @Body() createOrderDto: CreateOrderDto,) {
        return await this.orderService.createOrder(currentUserId, createOrderDto.productId);
    }

    @Get('admin/orders')
    @Roles(UserRole.ADMIN)
    async getAllPendingOrders(@Query('page', ParseIntPipe) page: number = 1, @Query('limit', ParseIntPipe) limit: number = 10,) {
        return await this.orderService.findAllPending(page, limit);
    }

    @Post('admin/orders/:orderId/approve')
    @Roles(UserRole.ADMIN)
    async approveOrder(@Param('orderId') orderId: string) {
        return await this.orderService.approveOrder(+orderId);
    }

    @Post('admin/orders/:orderId/reject')
    @Roles(UserRole.ADMIN)
    async rejectOrder(@Param('orderId') orderId: string) {
        return await this.orderService.rejectOrder(+orderId);
    }

}