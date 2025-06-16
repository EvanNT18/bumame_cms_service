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
    description: 'Preview data as JSON string',
    example: '{"title":"Test Voucher","voucherCode":"TEST123","description":"Test description"}',
  })
  previewData: string;

  @ApiProperty({
    description: 'Expiration time for the preview',
    example: '2024-01-20T10:30:00.000Z',
  })
  expiresAt: Date;
} 