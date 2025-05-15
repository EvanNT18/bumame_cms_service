import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtitleDto {
  @ApiProperty({
    description: 'Konten rich text subtitle (HTML)',
    example: '<p>Ini adalah subtitle <strong>contoh</strong>.</p>',
  })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'UUID partner yang berelasi',
    example: '5f66f9e5-ef77-4c25-a1a5-6010fba65c41',
  })
  @IsUUID()
  partnerId: string;
}
