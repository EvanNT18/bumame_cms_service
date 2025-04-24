import { ApiProperty } from '@nestjs/swagger';

export class VoucherResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the voucher',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Voucher code (uppercase)',
    example: 'BUMAME_BNI',
  })
  code: string;

  @ApiProperty({
    description: 'URL-friendly voucher identifier',
    example: 'bumame-bni',
  })
  slug: string;

  @ApiProperty({
    description: 'Whether the voucher is active',
    example: true,
  })
  is_active: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-05-15T10:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-05-15T10:00:00.000Z',
  })
  updated_at: Date;
}