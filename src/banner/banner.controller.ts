import { Controller, Get, Post, Body, Param, Delete, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerService } from './banner.service';
import { Banner } from './entities/banner.entity';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body('orderPosition') orderPosition: number,
  ): Promise<Banner> {
    return this.bannerService.create(file, orderPosition);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('orderPosition') orderPosition?: number,
  ): Promise<Banner> {
    return this.bannerService.update(id, file, orderPosition);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bannerService.remove(id);
  }

  @Patch(':id/activate')
  setActive(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.setActive(id);
  }
}