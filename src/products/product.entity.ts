import { Cart_items } from 'src/cart_item/cart_item.entity';
import { Order_items } from 'src/order_item/order_item.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  description: string;

  @Column()
  information: string;

  @Column()
  in_stock: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  public updated_at: Date;

  @OneToMany((_type) => Order_items, (order_items) => order_items.products, {
    eager: true,
  })
  order_items: Order_items[];

  @OneToMany((_type) => Cart_items, (cart_items) => cart_items.product, {
    eager: true,
  })
  cart_items: Cart_items[];
}
