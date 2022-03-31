import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  createProduct(@Body() CreateProductDto: CreateProductDto): Promise<Products> {
    return this.productsService.createProduct(CreateProductDto);
  }
}
