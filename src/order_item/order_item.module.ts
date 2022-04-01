import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { OrderItemController } from './order_item.controller';
import { OrdersItemRepository } from './order_item.repository';
import { OrderItemService } from './order_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersItemRepository]), ProductsModule],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
