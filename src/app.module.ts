import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemModule } from './order_item/order_item.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
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
