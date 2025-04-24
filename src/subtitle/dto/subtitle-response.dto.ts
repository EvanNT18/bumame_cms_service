import { ApiProperty } from '@nestjs/swagger';

export class SubtitleResponseDto {
  @ApiProperty({ description: 'Subtitle ID' })
  id: string;

  @ApiProperty({ description: 'Unique key for the subtitle' })
  key: string;

  @ApiProperty({ description: 'Text content of the subtitle' })
  text: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}