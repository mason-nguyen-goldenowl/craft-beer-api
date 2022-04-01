import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './product.entity';

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {
  async getProducts(): Promise<Products[]> {
    // const { price } = filterDto;
    const query = this.createQueryBuilder('product');
    // if(price){
    //   query.anyWhere('')
    // }
    const products = await query.getMany();

    return products;
  }

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

  async updateProductById(
    id: string,
    UpdateProductDto: UpdateProductDto,
    product,
    file,
  ): Promise<Products> {
    const { name, description, information, price, in_stock } =
      UpdateProductDto;
    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (information) {
      product.information = information;
    }
    if (price) {
      product.price = price;
    }
    if (in_stock) {
      product.in_stock = in_stock;
    }
    if (file) {
      product.image_url = file.path;
    }

    await this.save(product);
    return product;
  }
}
