import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { Subtitle } from './entities/subtitle.entity';

@Controller('subtitles')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @Get()
  findAll(): Promise<Subtitle[]> {
    return this.subtitleService.findAll();
  }

  @Get(':key')
  findByKey(@Param('key') key: string): Promise<Subtitle> {
    return this.subtitleService.findByKey(key);
  }

  @Post()
  create(@Body() createSubtitleDto: { key: string; text: string }): Promise<Subtitle> {
    return this.subtitleService.create(createSubtitleDto.key, createSubtitleDto.text);
  }

  @Patch(':key')
  update(
    @Param('key') key: string,
    @Body('text') text: string,
  ): Promise<Subtitle> {
    return this.subtitleService.update(key, text);
  }

  @Delete(':key')
  remove(@Param('key') key: string): Promise<void> {
    return this.subtitleService.remove(key);
  }
}