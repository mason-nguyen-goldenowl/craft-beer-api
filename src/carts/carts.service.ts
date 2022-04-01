import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { Carts } from './carts.entity';
import { CartsRepository } from './carts.repository';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartsRepository)
    private cartsRepository: CartsRepository,
  ) {}

  async getCart(user: Users) {
    const cart = await this.cartsRepository.findOne({ where: { user } });

    return cart;
  }
  async createCart(user: Users) {
    const cart = await this.cartsRepository.create({ user });
    console.log(cart);
    await this.cartsRepository.save(cart);
    return cart;
  }
}
