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
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
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

  @Get()
  @ApiCreatedResponse({
    status: 200,
    description: 'The api has been successfully fetched.',
  })
  @ApiBody({
    required: false,
    description:
      'If you want to filter product please add lowPrice and highPrice or Empty body to get all products',
    examples: undefined,
    type: GetProductFilterDto,
  })
  getProducts(@Body() filterDto?: GetProductFilterDto): Promise<Products[]> {
    return this.productsService.getProducts(filterDto);
  }

  @ApiCreatedResponse({
    status: 200,
    description: 'Product with which you want has been successfully fetched.',
  })
  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }

  @Get('/category')
  getProductByCategory(@Body() category: string): Promise<Products[]> {
    return this.productsService.getProductsByCategory(category);
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
    @UploadedFile() file,
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
  addToCart(@Param('id') id: string, @GetUser() user: Users): Promise<void> {
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
