import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateBannerDto {
  @ApiProperty({ type: 'integer', description: 'Position of the banner', required: false })
  @IsInt()
  @IsOptional()
  orderPosition?: number;
}