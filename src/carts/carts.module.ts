import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartsRepository])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
