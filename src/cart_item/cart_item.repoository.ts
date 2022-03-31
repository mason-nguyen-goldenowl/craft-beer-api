import { EntityRepository, Repository } from 'typeorm';
import { Cart_items } from './cart_item.entity';

@EntityRepository(Cart_items)
export class CartItemsRepository extends Repository<Cart_items> {}
