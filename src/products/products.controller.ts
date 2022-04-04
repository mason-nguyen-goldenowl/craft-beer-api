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
import { fileName } from 'src/ultils/img-update.ultils';
import { GetUser } from 'src/users/common/decorator/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { categoryDto } from './dto/category.dto';

import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Body() filterDto: GetProductFilterDto): Promise<Products[]> {
    console.log(filterDto);
    return this.productsService.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteProductById(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<void> {
    return this.productsService.deleteProductById(id, user);
  }

  @Post()
  @UseGuards(AuthGuard())
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
    @GetUser() user: Users,
    @UploadedFile() file,
  ): Promise<Products> {
    return this.productsService.createProduct(CreateProductDto, user, file);
  }

  @Post('/update/:id')
  @UseGuards(AuthGuard())
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
    @GetUser() user: Users,
  ): Promise<Products> {
    return this.productsService.updateProductById(
      id,
      UpdateProductDto,
      user,
      file,
    );
  }

  @Post('/cart/add/:id')
  @UseGuards(AuthGuard())
  addToCart(@Param('id') id: string, @GetUser() user: Users): Promise<void> {
    return this.productsService.addToCart(id, user);
  }

  @Post('/restore/:id')
  @UseGuards(AuthGuard())
  restoreProduct(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<void> {
    return this.productsService.restoreProductById(id, user);
  }

  @Post('/category/:category')
  getProductsByCategory(categoryDto: categoryDto): Promise<Products[]> {
    return this.productsService.getProductsByCategory(categoryDto);
  }
}
