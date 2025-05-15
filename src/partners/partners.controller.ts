import { Controller, Get, Post, Body, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './entities/partner.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) { }

  @ApiOperation({
    summary: 'Create a new partner',
  })
  @ApiResponse({
    status: 201,
    description: 'Partner created successfully',
    type: Partner,
  })
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @ApiOperation({
    summary: 'Paginate partners',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated partners',
    type: Partner,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
    example: 10,
  })
  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    page = page ?? 1;
    limit = limit ?? 10;
    limit = limit > 100 ? 100 : limit;
    return this.partnersService.index({
      page,
      limit,
    });
  }

  @ApiOperation({
    summary: 'Get a partner by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Partner found',
    type: Partner,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a partner',
  })
  @ApiResponse({
    status: 200,
    description: 'Partner updated',
    type: Partner,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @ApiOperation({
    summary: 'Delete a partner',
  })
  @ApiResponse({
    status: 200,
    description: 'Partner deleted',
    type: Partner,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
