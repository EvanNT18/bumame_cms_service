import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    description: 'Untuk Menuliskan Pertanyaan',
    example: 'Apakah ini pertanyaan?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Untuk Menuliskan Jawaban',
    example: 'Ini adalah jawabannya',
  })
  @IsString()
  answer: string;

  @ApiProperty({
    description: 'UUID Partner yang berelasi',
    example: '5f66f9e5-ef77-4c25-a1a5-6010fba65c41',
  })
  @IsUUID()
  partnerId: string;
}
