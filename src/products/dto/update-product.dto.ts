import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  price: number;

  @IsOptional()
  @ApiPropertyOptional()
  image_url: string;

  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsOptional()
  @ApiPropertyOptional()
  information: string;

  @IsOptional()
  @ApiPropertyOptional()
  in_stock: number;
}
