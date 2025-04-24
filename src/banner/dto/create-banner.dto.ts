import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ type: 'integer', description: 'Position of the banner' })
  @IsInt()
  @IsNotEmpty()
  orderPosition: number;
}