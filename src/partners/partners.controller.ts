import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @ApiOperation({
    summary: 'Create a new partner',
  })
  @ApiResponse({
    status: 201,
    description: 'Partner created successfully',
  })
  @HttpCode(201)
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @ApiOperation({
    summary: 'Paginate partners',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated partners',
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
  @ApiParam({
    name: 'id',
    description: 'Partner id',
  })
  @ApiResponse({
    status: 200,
    description: 'Partner found',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.partnersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get a partner by slug',
  })
  @ApiParam({
    name: 'slug',
    description: 'Partner slug',
  })
  @ApiResponse({
    status: 200,
    description: 'Partner found',
  })
  @Get('/by_slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.partnersService.findOneBySlug(slug);
  }

  @ApiOperation({
    summary: 'Update a partner',
  })
  @ApiParam({
    name: 'id',
    description: 'Partner id',
  })
  @ApiResponse({
    status: 200,
    description: 'Partner updated',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @ApiOperation({
    summary: 'Delete a partner',
  })
  @ApiParam({
    name: 'id',
    description: 'Partner id',
  })
  @ApiResponse({
    status: 204,
    description: 'Partner deleted',
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.partnersService.remove(id);
  }
}
