import { Cart_items } from 'src/cart_item/cart_item.entity';
import { Users } from 'src/users/users.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Carts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToOne((_type) => Users, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @OneToMany((_type) => Cart_items, (cart_items) => cart_items.cart, {
    eager: true,
  })
  cart_items: Cart_items[];
}
