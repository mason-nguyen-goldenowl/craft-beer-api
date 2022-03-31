import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productRepository: ProductsRepository,
  ) {}

  createProduct(CreateProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(CreateProductDto);
  }
}
