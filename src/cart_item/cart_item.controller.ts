import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { Cart_items } from './cart_item.entity';
import { CartItemService } from './cart_item.service';

@Controller('cart-item')
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}

  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'Add more quantity for cart item successful',
  })
  @Post('/increasing/:id')
  increasingQuatityCartItem(@Param('id') id: string): Promise<Cart_items> {
    return this.cartItemService.increasingQuantityCartItem(id);
  }

  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'Quantity of cart item have been decreassed.',
  })
  @Post('/decreasing/:id')
  decreassingQuatityCartItem(@Param('id') id: string): Promise<Cart_items> {
    return this.cartItemService.decreasingQuantityCartItem(id);
  }

  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'Cart item have been deleted',
  })
  @Delete('/delete/:id')
  deleteCartItem(@Param('id') id: string): Promise<void> {
    return this.cartItemService.deleteCartItem(id);
  }
}
