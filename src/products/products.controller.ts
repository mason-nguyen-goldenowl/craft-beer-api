import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Cart_items } from 'src/cart_item/cart_item.entity';
import { fileName } from 'src/ultils/img-update.ultils';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Products[]> {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }

  @Delete('/:id')
  deleteProductById(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProductById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: fileName,
      }),
    }),
  )
  createProduct(
    @Body() CreateProductDto: CreateProductDto,
    @UploadedFile() file,
  ): Promise<Products> {
    console.log(file);
    return this.productsService.createProduct(CreateProductDto, file);
  }

  @Post('/update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: fileName,
      }),
    }),
  )
  updateProductById(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto,
    @UploadedFile() file,
  ): Promise<Products> {
    return this.productsService.updateProductById(id, UpdateProductDto, file);
  }

  @Post('/cart/add/:id')
  addToCart(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<Cart_items> {
    return this.productsService.addToCart(id, user);
  }
}
