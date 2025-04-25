import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateBannerDto {
  @ApiProperty({ 
    type: 'string',
    format: 'binary',
    description: 'Banner image file (optional)',
    required: false
  })
  file?: any;

  @ApiProperty({ 
    type: 'integer', 
    description: 'Position of the banner', 
    required: false,
    example: 2
  })
  @IsInt()
  @IsOptional()
  orderPosition?: number;
}