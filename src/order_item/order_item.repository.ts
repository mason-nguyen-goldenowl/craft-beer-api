import { EntityRepository, Repository } from 'typeorm';

import { Order_items } from './order_item.entity';

@EntityRepository(Order_items)
export class OrdersItemRepository extends Repository<Order_items> {}
