import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly arrProduct: T[];
}
