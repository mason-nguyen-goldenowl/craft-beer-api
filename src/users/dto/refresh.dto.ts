import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RefreshDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
