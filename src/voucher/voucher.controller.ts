import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VoucherResponseDto } from './dto/voucher-response.dto';
import { CreateBannerDto } from 'src/banner/dto';
import { CreateSubtitleDto } from 'src/subtitle/dto';
import { CreateTermsAndConditionsDto } from 'src/terms-and-conditions/dto/create-terms-and-condition.dto';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto): Promise<VoucherResponseDto> {
    const voucher = await this.voucherService.create(createVoucherDto);
    return this.toResponseDto(await this.voucherService.findOneWithRelations(voucher.id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all vouchers' })
  @ApiResponse({
    status: 200,
    description: 'List of all vouchers',
    type: [VoucherResponseDto]
  })
  async findAll(): Promise<VoucherResponseDto[]> {
    const vouchers = await this.voucherService.findAll();
    return vouchers.map(v => this.toResponseDto(v));
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get voucher by ID' })
  @ApiParam({ name: 'id', description: 'Voucher UUID' })
  @ApiResponse({
    status: 200,
    description: 'Voucher details',
    type: VoucherResponseDto
  })
  async getById(@Param('id') id: string): Promise<VoucherResponseDto> {
    const voucher = await this.voucherService.findOne(id);
    return this.toResponseDto(voucher);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get voucher by slug' })
  @ApiParam({ name: 'slug', description: 'Voucher slug (e.g. bumame-bni)' })
  @ApiResponse({
    status: 200,
    description: 'Voucher details',
    type: VoucherResponseDto
  })
  async getBySlug(@Param('slug') slug: string): Promise<VoucherResponseDto> {
    const voucher = await this.voucherService.findBySlug(slug);
    return this.toResponseDto(voucher);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update voucher' })
  @ApiParam({ name: 'id', description: 'Voucher UUID' })
  @ApiBody({ type: UpdateVoucherDto })
  @ApiResponse({
    status: 200,
    description: 'Updated voucher details',
    type: VoucherResponseDto
  })
  async update(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto
  ): Promise<VoucherResponseDto> {
    const voucher = await this.voucherService.update(id, updateVoucherDto);
    return this.toResponseDto(voucher);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete voucher' })
  @ApiParam({ name: 'id', description: 'Voucher UUID' })
  @ApiResponse({
    status: 200,
    description: 'Voucher deleted successfully'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.voucherService.remove(id);
  }

  private toResponseDto(voucher: any): VoucherResponseDto {
    return {
  id: voucher.id,
  code: voucher.code,
  slug: voucher.slug,
  is_active: voucher.is_active,
  created_at: voucher.created_at,
  updated_at: voucher.updated_at,
  banner: new CreateBannerDto,
  subtitle: new CreateSubtitleDto,
  termsAndConditions: new CreateTermsAndConditionsDto,
  faqs: [],
};
  }
}