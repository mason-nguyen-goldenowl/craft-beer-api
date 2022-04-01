import { IsNumber } from 'class-validator';

export class GetProductFilterDto {
  @IsNumber()
  price?: number;
}
