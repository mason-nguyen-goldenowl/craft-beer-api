import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemService } from 'src/cart_item/cart_item.service';
import { CartsService } from 'src/carts/carts.service';
import { OrderItemService } from 'src/order_item/order_item.service';
import { Users } from 'src/users/users.entity';

import { Orders } from './orders.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private cartItemService: CartItemService,
    private cartService: CartsService,
    private orderItemService: OrderItemService,
  ) {}

  async getOrders(user: Users): Promise<Orders[]> {
    if (!user.is_admin) {
      throw new UnauthorizedException('Not allowed');
    }
    const orders = await this.ordersRepository.find();
    return orders;
  }

  async createOrder(user: Users): Promise<Orders> {
    const order = await this.ordersRepository.create({ user });
    await this.ordersRepository.save(order);

    const cartItems = await this.cartService.getCartItems(user);
    let total = 0;
    cartItems.map(async (cartItem) => {
      total += cartItem.price * cartItem.quantity;

      await this.orderItemService.createOrderItem({
        product: cartItem.product,
        order,
        quantity: cartItem.quantity,
      });
      await this.cartItemService.deleteCartItem(cartItem.id);
    });
    order.total = total;
    await this.ordersRepository.save(order);
    return order;
  }
}
