import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  image_url: string;

  @IsOptional()
  description: string;

  @IsOptional()
  information: string;

  @IsOptional()
  in_stock: number;
}
