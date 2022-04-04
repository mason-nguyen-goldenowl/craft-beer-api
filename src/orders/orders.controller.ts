import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/common/decorator/get-user.decorator';

import { Users } from 'src/users/users.entity';
import { Orders } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('/create')
  createOrder(@GetUser() user: Users): Promise<Orders> {
    return this.orderService.createOrder(user);
  }
}
