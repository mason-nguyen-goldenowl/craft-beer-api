import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotContains } from 'class-validator';
import { Carts } from 'src/carts/carts.entity';
import { Products } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Users } from 'src/users/users.entity';
import { Cart_items } from './cart_item.entity';
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

  async increasingQuatityCartItem(id: string): Promise<Cart_items> {
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

  async decreasingQuatityCartItem(id: string): Promise<Cart_items> {
    const carItemUpdate = await this.cartItemsRepository.findOne({
      where: { id },
    });

    if (carItemUpdate.quantity === 1 || carItemUpdate.quantity <= 0) {
      throw new HttpException('Please add quatity of product', 400);
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
