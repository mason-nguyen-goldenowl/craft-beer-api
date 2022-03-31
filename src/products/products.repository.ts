import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async createProduct(CreateProductDto: CreateProductDto): Promise<Product> {
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
