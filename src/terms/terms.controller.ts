import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { TermsService } from './terms.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Terms')
@Controller('terms')
export class TermsController {
  constructor(private readonly service: TermsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Buat term (syarat dan ketentuan)' })
  @ApiResponse({ status: 201, description: 'Term berhasil dibuat' })
  create(@Body() dto: CreateTermDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua term' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil term berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID dari term' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update term berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID dari term' })
  update(@Param('id') id: string, @Body() dto: UpdateTermDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Hapus term berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID dari term' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
