import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSubtitleDto {
  @ApiProperty({ 
    example: 'Selamat datang di platform kami',
    description: 'Text content of the subtitle' })
  @IsString()
  @IsNotEmpty()
  text: string;
}