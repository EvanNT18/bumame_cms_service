import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateVoucherDto } from './create-voucher.dto';

export class PreviewVoucherDto extends CreateVoucherDto {
  @ApiProperty({
    description: 'Session ID for preview (optional, will be generated if not provided)',
    example: 'preview-session-123',
    required: false,
  })
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class PreviewVoucherResponseDto {
  @ApiProperty({
    description: 'Session ID for the preview',
    example: 'preview-session-123',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Preview data as JSON object',
    example: {
      title: 'Test Voucher',
      voucherCode: 'TEST123',
      description: 'Test description',
      slug: 'test-voucher',
      typeLink: 'wa',
      link: 'https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+TEST123',
      partnerId: 'uuid-partner-id',
      terms: [{ text: 'Berlaku hingga akhir bulan' }]
    },
  })
  previewData: any;

  @ApiProperty({
    description: 'Expiration time for the preview',
    example: '2024-01-20T10:30:00.000Z',
  })
  expiresAt: Date;
} 