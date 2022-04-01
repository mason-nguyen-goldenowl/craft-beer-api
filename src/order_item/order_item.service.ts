import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Order_items } from './order_item.entity';
import { OrdersItemRepository } from './order_item.repository';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrdersItemRepository)
    private ordersItemsRepository: OrdersItemRepository,
    private productService: ProductsService,
  ) {}

  async createOrderItem({ product, order, quantity }): Promise<Order_items> {
    const orderItem = await this.ordersItemsRepository.create({
      product,
      order,
      price: product.price,
      quantity,
    });
    await this.productService.decreasingStock(product.id, quantity);
    await this.ordersItemsRepository.save(orderItem);
    return orderItem;
  }
}
