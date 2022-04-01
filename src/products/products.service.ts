import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { Cart_items } from 'src/cart_item/cart_item.entity';
import { CartItemService } from 'src/cart_item/cart_item.service';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';

import { CreateProductDto } from './dto/create-product.dto';

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

  getProducts(): Promise<Products[]> {
    return this.productRepository.getProducts();
  }

  async deleteProductById(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async getProductById(id: string): Promise<Products> {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('Product not found');
    }
    return found;
  }

  createProduct(CreateProductDto: CreateProductDto, file): Promise<Products> {
    return this.productRepository.createProduct(CreateProductDto, file);
  }

  async updateProductById(
    id: string,
    UpdateProductDto: UpdateProductDto,
    file,
  ): Promise<Products> {
    const product = await this.getProductById(id);

    return this.productRepository.updateProductById(
      id,
      UpdateProductDto,
      product,
      file,
    );
  }

  async addToCart(id: string, user: Users): Promise<Cart_items> {
    const product = await this.getProductById(id);
    // console.log(cart);

    let cart = await this.cartsService.getCart(user);

    if (!cart) {
      cart = await this.cartsService.createCart(user);
    }
    return this.cartItemsService.createCartItem({
      product,
      cart,
      price: product.price,
    });
  }
}
