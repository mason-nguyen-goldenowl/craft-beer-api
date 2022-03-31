import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './product.entity';
import { ProductsService } from './products.service';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createProduct(
    @Body() CreateProductDto: CreateProductDto,
    @UploadedFile() file,
  ): Promise<Products> {
    console.log(file);
    return this.productsService.createProduct(CreateProductDto, file);
  }
}
