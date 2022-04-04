import { IsNumber, IsOptional } from 'class-validator';

export class GetProductFilterDto {
  @IsOptional()
  lowPrice?: number;

  @IsOptional()
  highPrice?: number;
}
