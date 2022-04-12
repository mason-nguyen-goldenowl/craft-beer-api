import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Cart_items } from 'src/cart_item/cart_item.entity';
import { GetUser } from 'src/users/common/decorator/get-user.decorator';
import { Users } from 'src/users/users.entity';

import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}
  @UseGuards(AuthGuard())
  @Get()
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'The cart item has been successfully fetched.',
  })
  getCartItem(@GetUser() user: Users): Promise<Cart_items[]> {
    return this.cartService.getCartItems(user);
  }
}
