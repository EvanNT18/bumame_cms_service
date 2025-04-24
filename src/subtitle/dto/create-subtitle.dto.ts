import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtitleDto {
  @ApiProperty({ description: 'Unique key for the subtitle' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Text content of the subtitle' })
  @IsString()
  @IsNotEmpty()
  text: string;
}