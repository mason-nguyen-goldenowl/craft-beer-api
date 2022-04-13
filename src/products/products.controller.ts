import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Carts } from 'src/carts/carts.entity';
import { fileName } from 'src/ultils/img-update.ultils';
import { GetUser } from 'src/users/common/decorator/get-user.decorator';
import { Users } from 'src/users/users.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/all')
  @ApiCreatedResponse({
    status: 200,
    description: 'The api has been successfully fetched.',
  })
  getProducts(): Promise<Products[]> {
    return this.productsService.getProducts();
  }

  @Get()
  paginateProductst(
    @Query('page') query: string,
  ): Promise<{ arrProduct: Products[]; totalPage: number }> {
    return this.productsService.paginateProduct(query);
  }

  @Post('/filter')
  @ApiCreatedResponse({
    status: 200,
    description: 'The api has been successfully fetched.',
  })
  filterProduct(@Body() filterDto: GetProductFilterDto): Promise<Products[]> {
    return this.productsService.filterProduct(filterDto);
  }

  @ApiCreatedResponse({
    status: 200,
    description: 'Product with which you want has been successfully fetched.',
  })
  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  deleteProductById(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<void> {
    return this.productsService.deleteProductById(id, user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 201,
    description: 'Product has been successfully created.',
  })
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
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Products> {
    return this.productsService.createProduct(CreateProductDto, user, file);
  }

  @Post('/update/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('authorization')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: fileName,
      }),
    }),
  )
  @ApiCreatedResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
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
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'The product has been successfully added to cart.',
  })
  addToCart(@Param('id') id: string, @GetUser() user: Users): Promise<Carts> {
    return this.productsService.addToCart(id, user);
  }

  @Post('/restore/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({
    status: 200,
    description: 'The product has been successfully restored.',
  })
  restoreProduct(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<void> {
    return this.productsService.restoreProductById(id, user);
  }
}
