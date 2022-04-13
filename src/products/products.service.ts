import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemService } from 'src/cart_item/cart_item.service';
import { Carts } from 'src/carts/carts.entity';
import { CartsService } from 'src/carts/carts.service';
import { Users } from 'src/users/users.entity';
import { In } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productRepository: ProductsRepository,
    private cartsService: CartsService,
    private cartItemsService: CartItemService,
  ) {}

  async getProducts(): Promise<Products[]> {
    const products = await this.productRepository.find();

    return products;
  }

  async filterProduct(filterDto: GetProductFilterDto): Promise<Products[]> {
    let productFilter = [];
    let result = [];

    if (filterDto.category.length > 0) {
      productFilter = await this.productRepository.find({
        where: { category: In(filterDto.category) },
      });
      result = productFilter.filter(
        (product) =>
          product.price >= filterDto.lowPrice &&
          product.price <= filterDto.highPrice,
      );
    } else {
      result = await (
        await this.productRepository.find()
      ).filter(
        (product) =>
          product.price >= filterDto.lowPrice &&
          product.price <= filterDto.highPrice,
      );
    }

    return result;
  }

  async paginateProduct(
    query,
  ): Promise<{ arrProduct: Products[]; totalPage: number }> {
    const builder = this.productRepository.createQueryBuilder('product');
    const page = query || 1;
    const perPage = 8;

    const totalPage = Math.ceil((await this.getProducts()).length / perPage);
    builder.offset((page - 1) * perPage).limit(perPage);
    const products = await builder.getMany();

    return { arrProduct: products, totalPage };
  }

  async getProductsByCategory(category: string): Promise<Products[]> {
    const products = await this.getProducts();
    const productsCategory = (await products).filter(
      (product) => product.category === category,
    );
    return productsCategory;
  }

  async getProductById(id: string): Promise<Products> {
    const found = await this.productRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException('Product not found');
    }
    return found;
  }

  async createProduct(
    CreateProductDto: CreateProductDto,
    user: Users,
    file,
  ): Promise<Products> {
    if (!user.is_admin) {
      throw new UnauthorizedException('Not allowed');
    }

    const { name, price, description, information, in_stock, category } =
      CreateProductDto;
    const product = this.productRepository.create({
      name,
      price,
      description,
      information,
      in_stock,
      category,
      image_url: file?.filename,
    });

    await this.productRepository.save(product);
    return product;
  }

  async updateProductById(
    id: string,
    UpdateProductDto: UpdateProductDto,
    user: Users,
    file,
  ): Promise<Products> {
    if (!user.is_admin) {
      throw new UnauthorizedException('Not allowed');
    }
    const product = await this.getProductById(id);
    const { name, description, information, price, in_stock, category } =
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
    if (category) {
      product.category = category;
    }
    if (file) {
      product.image_url = file.filename;
    }

    await this.productRepository.save(product);
    return product;
  }

  async decreasingStock(id: string, quantity): Promise<void> {
    const product = await this.getProductById(id);
    product.in_stock -= quantity;
    if (product.in_stock === 0) {
      product.sold_out = true;
    }
    if (product.in_stock < 0) {
      throw new HttpException('Product in stock is not enough for you', 400);
    }
    await this.productRepository.save(product);
  }

  async addToCart(id: string, user: Users): Promise<Carts> {
    const product = await this.getProductById(id);

    let cart = await this.cartsService.getCart(user);

    if (!cart) {
      cart = await this.cartsService.createCart(user);
    }
    let cartItem = await this.cartItemsService.CartItemExits(cart, product);
    if (cartItem) {
      await this.cartItemsService.increasingQuantityCartItem(cartItem.id);
    } else {
      cartItem = await this.cartItemsService.createCartItem({
        product,
        cart,
        price: product.price,
      });
    }
    return cart;
  }

  async deleteProductById(id: string, user: Users): Promise<void> {
    if (!user.is_admin) {
      throw new UnauthorizedException('Not allowed');
    }
    const productDelete = await this.getProductById(id);

    if (!productDelete) {
      throw new NotFoundException('Product not found');
    }

    productDelete.deleted_at = new Date();
    await this.productRepository.save(productDelete);
  }

  async restoreProductById(id: string, user: Users): Promise<void> {
    if (!user.is_admin) {
      throw new UnauthorizedException('Not allowed');
    }

    const productRestore = await this.productRepository.restore(id);

    if (!productRestore) {
      throw new NotFoundException('Product not found');
    }
  }
}
