import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  @ApiOperation({ summary: 'Hapus subtitle berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID subtitle' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
