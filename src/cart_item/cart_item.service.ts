import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/carts/carts.entity';
import { Products } from 'src/products/product.entity';

import { Cart_items } from './cart_item.entity';
import { CartItemsRepository } from './cart_item.repoository';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemsRepository)
    private cartItemsRepository: CartItemsRepository,
  ) {}

  async getCartItem(cart: Carts): Promise<Cart_items[]> {
    const cartItems = await this.cartItemsRepository.find({ where: { cart } });

    return cartItems;
  }

  async CartItemExits(cart: Carts, product: Products): Promise<Cart_items> {
    const cartItem = await this.cartItemsRepository.findOne({
      where: { cart, product },
    });
    return cartItem;
  }

  async createCartItem({ product, price, cart }): Promise<Cart_items> {
    const cartItem = await this.cartItemsRepository.create({
      product,
      quantity: 1,
      cart,
      price: price,
    });
    await this.cartItemsRepository.save(cartItem);
    return cartItem;
  }

  async increasingQuantityCartItem(id: string): Promise<Cart_items> {
    const carItemUpdate = await this.cartItemsRepository.findOne({
      where: { id },
    });
    const in_stock = carItemUpdate.product.in_stock;

    if (carItemUpdate.quantity >= in_stock) {
      throw new HttpException("Can't add more product", 400);
    }

    carItemUpdate.quantity++;
    await this.cartItemsRepository.save(carItemUpdate);
    return carItemUpdate;
  }

  async decreasingQuantityCartItem(id: string): Promise<Cart_items> {
    const carItemUpdate = await this.cartItemsRepository.findOne({
      where: { id },
    });

    if (carItemUpdate.quantity === 1 || carItemUpdate.quantity <= 0) {
      throw new HttpException('Please add quantity of product', 400);
    }
    carItemUpdate.quantity--;
    await this.cartItemsRepository.save(carItemUpdate);
    return carItemUpdate;
  }

  async deleteCartItem(id: string): Promise<void> {
    const result = await this.cartItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
}
