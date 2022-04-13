import { Exclude } from 'class-transformer';
import { Carts } from 'src/carts/carts.entity';
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
export class Cart_items extends BaseEntity {
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

  @ManyToOne((_type) => Carts, (cart) => cart.cart_items, { eager: false })
  @Exclude({ toPlainOnly: true })
  cart: Carts;

  @ManyToOne((_type) => Products, (products) => products.cart_items, {
    onDelete: 'CASCADE',
    eager: true,
  })
  product: Products;
}
