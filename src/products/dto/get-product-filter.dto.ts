import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetProductFilterDto {
  @IsOptional()
  @ApiPropertyOptional()
  lowPrice?: number;

  @IsOptional()
  @ApiPropertyOptional()
  highPrice?: number;
}
