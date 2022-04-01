import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}
  //   @Post()
  //   createCart(@GetUser()user:Users):
}
