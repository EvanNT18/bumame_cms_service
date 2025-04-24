import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';
import { SubtitleResponseDto } from './dto/subtitle-response.dto';
import { Subtitle } from './entities/subtitle.entity';

@Controller('subtitles')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @Get()
  async findAll(): Promise<SubtitleResponseDto[]> {
    const subtitles = await this.subtitleService.findAll();
    return subtitles.map(subtitle => this.toResponseDto(subtitle));
  }

  @Get(':key')
  async findByKey(@Param('key') key: string): Promise<SubtitleResponseDto> {
    const subtitle = await this.subtitleService.findByKey(key);
    return this.toResponseDto(subtitle);
  }

  @Post()
  async create(@Body() createSubtitleDto: CreateSubtitleDto): Promise<SubtitleResponseDto> {
    const subtitle = await this.subtitleService.create(createSubtitleDto.key, createSubtitleDto.text);
    return this.toResponseDto(subtitle);
  }

  @Patch(':key')
  async update(
    @Param('key') key: string,
    @Body() updateSubtitleDto: UpdateSubtitleDto,
  ): Promise<SubtitleResponseDto> {
    const subtitle = await this.subtitleService.update(key, updateSubtitleDto.text);
    return this.toResponseDto(subtitle);
  }

  @Delete(':key')
  async remove(@Param('key') key: string): Promise<void> {
    await this.subtitleService.remove(key);
  }

  private toResponseDto(subtitle: Subtitle): SubtitleResponseDto {
    const dto = new SubtitleResponseDto();
    dto.id = subtitle.id;
    dto.key = subtitle.key;
    dto.text = subtitle.text;
    dto.createdAt = subtitle.createdAt;
    dto.updatedAt = subtitle.updatedAt;
    return dto;
  }
}