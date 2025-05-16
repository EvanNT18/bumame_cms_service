import {
<<<<<<< HEAD
  Controller, Get, Post, Body, Patch, Param, Delete,
  HttpCode,
=======
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
>>>>>>> 9aecf93ffa0f73772242483e8743171ceaf1201f
} from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Subtitles')
@Controller('subtitles')
export class SubtitlesController {
  constructor(private readonly service: SubtitlesService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Buat subtitle baru' })
  @ApiResponse({ status: 201, description: 'Subtitle berhasil dibuat' })
  create(@Body() dto: CreateSubtitleDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua subtitle' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil subtitle berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID subtitle' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subtitle berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID subtitle' })
  update(@Param('id') id: string, @Body() dto: UpdateSubtitleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Hapus subtitle berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID subtitle' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
