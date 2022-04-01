import { Controller, Delete, Param, Post } from '@nestjs/common';
import { Cart_items } from './cart_item.entity';
import { CartItemService } from './cart_item.service';

@Controller('cart-item')
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}

  @Post('/increasing/:id')
  increasingQuatityCartItem(@Param('id') id: string): Promise<Cart_items> {
    return this.cartItemService.increasingQuatityCartItem(id);
  }

  @Post('/decreasing/:id')
  decreassingQuatityCartItem(@Param('id') id: string): Promise<Cart_items> {
    return this.cartItemService.decreasingQuatityCartItem(id);
  }

  @Delete('/delete/:id')
  deleteCartItem(@Param('id') id: string): Promise<void> {
    return this.cartItemService.deleteCartItem(id);
  }
}
