import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';

import { CreateFaqDto } from 'src/faqs/dto/create-faq.dto';
import { CreateTermDto } from 'src/terms/dto/create-term.dto';

export class CreateVoucherDto {
  @ApiProperty({
    description: 'Voucher title',
    example: 'Voucher of the Year',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Voucher code',
    example: 'VOUCHER-OF-THE-YEAR',
  })
  @IsString()
  voucherCode: string;

  @ApiProperty({
    description: 'Voucher description',
    example:
      'Voucher of the Year will help you save money for the... well, year!',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Voucher slug',
    example: 'voucher-of-the-year',
  })
  @IsString()
  slug: string;

  // 🔥 Tambahkan kolom typeLink
  @ApiProperty({
    description: 'Type of link (wa or custom)',
    example: 'wa',
    enum: ['wa', 'custom'],
  })
  @IsEnum(['wa', 'custom'])
  typeLink: 'wa' | 'custom';
  // -----

  // 🔥 Tambahkan kolom link (opsional)
  @ApiProperty({
    description: 'Custom link (required only if typeLink is "custom")',
    example: 'https://yourcustomlink.com', 
    required: false,
  })
  @IsOptional()
  @IsString()
  link?: string;
  // -----

  @ApiProperty({
    description: 'List of terms for this voucher',
    type: () => [CreateTermDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTermDto)
  terms?: CreateTermDto[];

  @ApiProperty({
    description: 'Partner ID',
    example: '<PARTNER_ID_HERE>',
  })
  @IsString()
  partnerId: string;
}