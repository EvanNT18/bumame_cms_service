import { PartialType } from '@nestjs/mapped-types';
import { CreateVoucherDto } from './create-voucher.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}