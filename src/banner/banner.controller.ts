import { Controller, Get, Post, Body, Param, Delete, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerResponseDto } from './dto/banner-response.dto';
import { Banner } from './entities/banner.entity';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all banners' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of banners',
    type: [BannerResponseDto]
  })
  async findAll(): Promise<BannerResponseDto[]> {
    const banners = await this.bannerService.findAll();
    return banners.map(banner => this.toResponseDto(banner));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a banner by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The found banner',
    type: BannerResponseDto
  })
  async findOne(@Param('id') id: string): Promise<BannerResponseDto> {
    const banner = await this.bannerService.findOne(id);
    return this.toResponseDto(banner);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new banner' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Banner data with image file',
    type: CreateBannerDto,
  })
  @ApiResponse({ 
    status: 201, 
    description: 'The created banner',
    type: BannerResponseDto
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ): Promise<BannerResponseDto> {
    const banner = await this.bannerService.create(file, createBannerDto.orderPosition);
    return this.toResponseDto(banner);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a banner' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Banner update data (image and/or position)',
    type: UpdateBannerDto,
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The updated banner',
    type: BannerResponseDto
  })
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
  @ApiOperation({ summary: 'Delete a banner' })
  @ApiResponse({ status: 204, description: 'Banner deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.bannerService.remove(id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a banner (deactivates others)' })
  @ApiResponse({ 
    status: 200, 
    description: 'The activated banner',
    type: BannerResponseDto
  })
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