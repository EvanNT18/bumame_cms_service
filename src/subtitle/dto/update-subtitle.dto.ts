import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSubtitleDto {
  @ApiProperty({ description: 'Text content of the subtitle' })
  @IsString()
  @IsNotEmpty()
  text: string;
}