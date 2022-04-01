import { Users } from 'src/users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Carts } from './carts.entity';

@EntityRepository(Carts)
export class CartsRepository extends Repository<Carts> {
  // async createCart(user: Users): Promise<Carts> {
  //   const cart = await this.create({
  //     user,
  //   });
  //   await this.save(cart);
  //   return cart;
  // }
}
