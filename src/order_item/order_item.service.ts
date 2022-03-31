import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersItemRepository } from './order_item.repository';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrdersItemRepository)
    private ordersItemsRepository: OrdersItemRepository,
  ) {}
}
