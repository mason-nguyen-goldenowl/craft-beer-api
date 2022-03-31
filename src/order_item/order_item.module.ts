import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from './order_item.controller';
import { OrdersItemRepository } from './order_item.repository';
import { OrderItemService } from './order_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersItemRepository])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
