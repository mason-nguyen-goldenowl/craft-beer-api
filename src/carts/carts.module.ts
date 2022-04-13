import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemModule } from 'src/cart_item/cart_item.module';
import { UsersModule } from 'src/users/users.module';

import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartsService } from './carts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartsRepository]),
    CartItemModule,
    UsersModule,
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
