import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { ApiOperation } from '@nestjs/swagger';
import { VoucherResponseDto } from './dto/voucher-response.dto';

@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}
  
  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get voucher by ID (UUID)' })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<VoucherResponseDto> {
    const voucher = await this.voucherService.findOne(id);
    return this.toResponseDto(voucher);
  }
  
  private toResponseDto(voucher: Voucher): VoucherResponseDto {
    return {
      id: voucher.id,
      code: voucher.code,
      slug: voucher.slug,
      is_active: voucher.is_active,
      created_at: voucher.created_at,
      updated_at: voucher.updated_at,
    };
  }


  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get voucher by slug' })
  async getBySlug(@Param('slug') slug: string): Promise<VoucherResponseDto> {
    const voucher = await this.voucherService.findBySlug(slug);
    return this.toResponseDto(voucher);
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.voucherService.findByCode(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(id, updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(id);
  }
}