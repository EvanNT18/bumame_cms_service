import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new voucher'
  })
  @ApiResponse({
    status: 201,
    description: 'Voucher created successfully'
  })
  @HttpCode(201)
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.vouchersService.create(createVoucherDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of vouchers'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 10
  })
  @ApiResponse({
    status: 200,
    description: 'List of vouchers'
  })
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    page = page ?? 1;
    limit = limit ?? 10;
    limit = limit > 100 ? 100 : limit;
    return this.vouchersService.index({
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a voucher by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Voucher ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Voucher found'
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.vouchersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a voucher by ID'
  })
  @ApiParam({
    name: 'id', description: 'Voucher ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Voucher updated successfully'
  })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.vouchersService.update(id, updateVoucherDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a voucher by ID'
  })
  @ApiParam({
    name: 'id', description: 'Voucher ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Voucher deleted successfully'
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vouchersService.remove(id);
  }
}
