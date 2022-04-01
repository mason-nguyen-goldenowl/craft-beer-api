import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/carts/carts.entity';
import { Products } from 'src/products/product.entity';
import { Users } from 'src/users/users.entity';
import { CartItemsRepository } from './cart_item.repoository';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemsRepository)
    private cartItemsRepository: CartItemsRepository,
  ) {}
  async createCartItem({ product, price, cart }) {
    const cartItem = await this.cartItemsRepository.create({
      product,
      quantity: 1,
      cart,
      price: price,
    });
    await this.cartItemsRepository.save(cartItem);
    return cartItem;
  }
}
