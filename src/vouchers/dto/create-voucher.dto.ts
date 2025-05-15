import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
    description: 'Partner ID',
    example: '<PARTNER_ID_HERE>',
  })
  @IsString()
  partnerId: string;
}
