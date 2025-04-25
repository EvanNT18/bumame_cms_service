import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtitleDto {
  @ApiProperty({ 
    example: 'welcome_text',
    description: 'Unique key for the subtitle' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ 
    example: 'Selamat datang di website kami',
    description: 'Text content of the subtitle' })
  @IsString()
  @IsNotEmpty()
  text: string;
}