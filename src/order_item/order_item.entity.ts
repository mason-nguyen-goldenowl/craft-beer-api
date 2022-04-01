import { Exclude } from 'class-transformer';
import { Orders } from 'src/orders/orders.entity';
import { Products } from 'src/products/product.entity';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order_items extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(7)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(7)',
    onUpdate: 'CURRENT_TIMESTAMP(7)',
  })
  public updated_at: Date;

  @ManyToOne((_type) => Orders, (order) => order.order_items, { eager: false })
  @Exclude({ toPlainOnly: true })
  order: Orders;

  @ManyToOne((_type) => Products, (products) => products.order_items, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  product: Products;
}
