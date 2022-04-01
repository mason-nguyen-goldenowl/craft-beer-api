import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemModule } from 'src/cart_item/cart_item.module';
import { CartsModule } from 'src/carts/carts.module';
import { UsersModule } from 'src/users/users.module';

import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    UsersModule,
    CartsModule,
    CartItemModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
