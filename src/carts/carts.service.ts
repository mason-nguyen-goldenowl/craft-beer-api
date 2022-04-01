import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart_items } from 'src/cart_item/cart_item.entity';
import { CartItemService } from 'src/cart_item/cart_item.service';

import { Users } from 'src/users/users.entity';
import { Carts } from './carts.entity';

import { CartsRepository } from './carts.repository';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartsRepository)
    private cartsRepository: CartsRepository,
    private cartItemsService: CartItemService,
  ) {}

  async getCart(user: Users): Promise<Carts> {
    const cart = await this.cartsRepository.findOne({ where: { user } });

    return cart;
  }

  async getCartItems(user: Users): Promise<Cart_items[]> {
    const cart = await this.getCart(user);
    const cartItems = await this.cartItemsService.getCartItem(cart);
    return cartItems;
  }

  async createCart(user: Users) {
    const cart = await this.cartsRepository.create({ user });
    await this.cartsRepository.save(cart);
    return cart;
  }
}
