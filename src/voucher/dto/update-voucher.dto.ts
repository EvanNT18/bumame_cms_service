import { PartialType } from '@nestjs/mapped-types';
import { CreateVoucherDto } from './create-voucher.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {

  @ApiProperty ({
    description:'Change Value true or false'
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}