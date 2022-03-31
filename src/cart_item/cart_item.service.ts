import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemsRepository } from './cart_item.repoository';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemsRepository)
    private cart_itemsRepository: CartItemsRepository,
  ) {}
}
