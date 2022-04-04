import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CartItemModule } from './cart_item/cart_item.module';
import { CartsModule } from './carts/carts.module';
import { OrderItemModule } from './order_item/order_item.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'craftbeer',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    ProductsModule,
    UsersModule,
    CartsModule,
    CartItemModule,
    OrdersModule,
    OrderItemModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
