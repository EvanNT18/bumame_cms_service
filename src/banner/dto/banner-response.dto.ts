import { ApiProperty } from '@nestjs/swagger';

export class BannerResponseDto {
  @ApiProperty({
    description: 'Banner ID' })
  id: string;

  @ApiProperty({ 
    description: 'URL of the banner image' })
  imageUrl: string;

  @ApiProperty({ description: 'Whether the banner is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Position of the banner' })
  orderPosition: number;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}