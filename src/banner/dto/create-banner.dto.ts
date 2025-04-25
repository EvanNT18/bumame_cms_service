import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ 
    type: 'string',
    format: 'binary',
    description: 'Banner image file'
  })
  file: any;

  @ApiProperty({ 
    type: 'integer', 
    description: 'Position of the banner',
    example: 1
  })
  @IsInt()
  @IsNotEmpty()
  orderPosition: number;
}