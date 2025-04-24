import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { MinioService } from '../storage/minio.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    private minioService: MinioService,
  ) {}

  private sanitizeFileName(fileName: string): string {
   
    return fileName
      .replace(/[^\w\d.-]/g, '_')  
      .replace(/\s+/g, '_')  
      .toLowerCase();               
  }

  private generateFileName(file: Express.Multer.File): string {
    const sanitizedOriginalName = this.sanitizeFileName(file.originalname);
    return `${Date.now()}-${sanitizedOriginalName}`;
  }

  async findAll(): Promise<Banner[]> {
    const banners = await this.bannerRepository.find({
      order: { orderPosition: 'ASC' },
    });

    for (const banner of banners) {
      banner.imageUrl = await this.minioService.getFileUrl(banner.imageUrl);
    }

    return banners;
  }

  async findOne(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    banner.imageUrl = await this.minioService.getFileUrl(banner.imageUrl);
    return banner;
  }

  async create(file: Express.Multer.File, orderPosition: number): Promise<Banner> {
    const fileName = this.generateFileName(file);
    await this.minioService.uploadFile(file, fileName);
    
    const banner = this.bannerRepository.create({
      imageUrl: fileName,
      orderPosition,
    });
    
    return await this.bannerRepository.save(banner);
  }

  async update(id: string, file?: Express.Multer.File, orderPosition?: number): Promise<Banner> {
    const banner = await this.findOne(id);
    
    if (file) {
      // Hapus file lama jika ada
      if (banner.imageUrl) {
        await this.minioService.deleteFile(banner.imageUrl);
      }
      
      // Upload file baru
      const fileName = this.generateFileName(file);
      await this.minioService.uploadFile(file, fileName);
      banner.imageUrl = fileName;
    }
    
    if (orderPosition !== undefined) {
      banner.orderPosition = orderPosition;
    }
    
    return await this.bannerRepository.save(banner);
  }

  async remove(id: string): Promise<void> {
    const banner = await this.findOne(id);
    if (banner.imageUrl) {
      await this.minioService.deleteFile(banner.imageUrl);
    }
    await this.bannerRepository.delete(id);
  }

  async setActive(id: string): Promise<Banner> {
    await this.bannerRepository.update({}, { isActive: false });
    const banner = await this.findOne(id);
    banner.isActive = true;
    return await this.bannerRepository.save(banner);
  }
}