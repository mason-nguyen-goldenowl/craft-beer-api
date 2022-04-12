import { Exclude } from 'class-transformer';
import { Order_items } from 'src/order_item/order_item.entity';
import { Users } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  total: number;

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

  @ManyToOne((_type) => Users, (user) => user.orders, { eager: true })
  @Exclude({ toPlainOnly: true })
  user: Users;

  @OneToMany((_type) => Order_items, (order_items) => order_items.order, {
    eager: true,
  })
  order_items: Order_items[];
}
