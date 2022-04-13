import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './cart_item.controller';
import { CartItemsRepository } from './cart_item.repoository';
import { CartItemService } from './cart_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemsRepository])],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
