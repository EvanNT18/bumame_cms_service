import { Controller, Get, Post, Body, Param, Delete, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerResponseDto } from './dto/banner-response.dto';
import { Banner } from './entities/banner.entity';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAll(): Promise<BannerResponseDto[]> {
    const banners = await this.bannerService.findAll();
    return banners.map(banner => this.toResponseDto(banner));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BannerResponseDto> {
    const banner = await this.bannerService.findOne(id);
    return this.toResponseDto(banner);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ): Promise<BannerResponseDto> {
    const banner = await this.bannerService.create(file, createBannerDto.orderPosition);
    return this.toResponseDto(banner);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<BannerResponseDto> {
    const banner = await this.bannerService.update(id, file, updateBannerDto.orderPosition);
    return this.toResponseDto(banner);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.bannerService.remove(id);
  }

  @Patch(':id/activate')
  async setActive(@Param('id') id: string): Promise<BannerResponseDto> {
    const banner = await this.bannerService.setActive(id);
    return this.toResponseDto(banner);
  }

  private toResponseDto(banner: Banner): BannerResponseDto {
    const dto = new BannerResponseDto();
    dto.id = banner.id;
    dto.imageUrl = banner.imageUrl;
    dto.isActive = banner.isActive;
    dto.orderPosition = banner.orderPosition;
    dto.createdAt = banner.createdAt;
    dto.updatedAt = banner.updatedAt;
    return dto;
  }
}