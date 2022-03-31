import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {
  async createProduct(CreateProductDto: CreateProductDto): Promise<Products> {
    const { name, price, description, information, in_stock } =
      CreateProductDto;
    const product = this.create({
      name,
      price,
      description,
      information,
      in_stock,
    });

    await this.save(product);
    return product;
  }
}
