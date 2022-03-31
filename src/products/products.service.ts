import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productRepository: ProductsRepository,
  ) {}

  createProduct(CreateProductDto: CreateProductDto): Promise<Products> {
    return this.productRepository.createProduct(CreateProductDto);
  }
}
