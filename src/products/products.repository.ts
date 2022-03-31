import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {
  async createProduct(
    CreateProductDto: CreateProductDto,
    file,
  ): Promise<Products> {
    const { name, price, description, information, in_stock } =
      CreateProductDto;
    const product = this.create({
      name,
      price,
      description,
      information,
      in_stock,
      image_url: file.path,
    });
    console.log(file);
    await this.save(product);
    return product;
  }
}
