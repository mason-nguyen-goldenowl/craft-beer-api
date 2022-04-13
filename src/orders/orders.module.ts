import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemModule } from 'src/cart_item/cart_item.module';
import { CartsModule } from 'src/carts/carts.module';
import { OrderItemModule } from 'src/order_item/order_item.module';
import { UsersModule } from 'src/users/users.module';

import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    CartItemModule,
    CartsModule,
    UsersModule,
    OrderItemModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
