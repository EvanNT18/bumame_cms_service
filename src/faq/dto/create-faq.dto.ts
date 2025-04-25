// src/faqs/dto/create-faq.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    example: 'Apakah ada minimum transaksi?',
    description: 'Pertanyaan yang akan ditampilkan'
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    example: 'Tidak ada minimum transaksi untuk layanan ini',
    description: 'Jawaban dari pertanyaan'
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    example: 'Pembayaran',
    description: 'Kategori FAQ',
    required: false
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    example: true,
    description: 'Status aktif/tidak aktif FAQ',
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Urutan tampilan FAQ',
    required: false,
    default: 0
  })
  @IsOptional()
  order?: number;
}