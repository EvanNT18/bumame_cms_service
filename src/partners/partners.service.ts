import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Repository } from 'typeorm';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Partner } from './entities/partner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/banners/entities/banner.entity';
import { MinioService } from 'src/storage/minio.service';
import sharp from 'sharp';

@Injectable()
export class PartnersService {
  constructor(
    @Inject(MinioService)
    private readonly minioService: MinioService,

    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  async create(image: Express.Multer.File, createPartnerDto: CreatePartnerDto) {
    if (!image) throw new BadRequestException('image is required');
    
    const processedImageBuffer = await sharp(image.buffer).resize(1920, 1080).webp().toBuffer();
    const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';
    await this.minioService.uploadFile(processedImageBuffer, filename);

    await this.partnersRepository.create({
      ...createPartnerDto,
      logoFilename: filename,
    }).save();

    return {
      message: `Partner created successfully`,
    };
  }

  async index(options: IPaginationOptions) {
    return await paginate<Partner>(this.partnersRepository, options).then(async (partners) => {
      return {
        items: await Promise.all(partners.items.map(async (partner) => {
          return {
            ...partner,
            logoFilename: await this.minioService.getFileUrl(partner.logoFilename),
          }
        })),
        meta: partners.meta,
        links: partners.links,
      } as Pagination<Partner, IPaginationMeta>;
    });
  }

  async findOne(id: string) {
    return this.partnersRepository.findOneOrFail({ where: { id }, relations: ['vouchers', 'banners', 'subtitles', 'faqs', 'terms'] })
      .then(async (partner) => {
        return {
          ...partner,
          logoFilename: await this.minioService.getFileUrl(partner.logoFilename),
          banners: await Promise.all(partner.banners.map(async (banner) => {
            return {
              ...banner,
              imageUrl: await this.minioService.getFileUrl(banner.filename),
            } as unknown as Banner;
          })),
        }
      })
      .catch(() => {
        throw new NotFoundException(`Partner with id ${id} not found`);
      });
  }

  async findOneBySlug(slug: string) {
    return this.partnersRepository.findOneOrFail({ where: { slug }, relations: ['vouchers', 'banners', 'subtitles', 'faqs', 'terms'] })
      .then(async (partner) => {
        return {
          ...partner,
          banners: await Promise.all(partner.banners.map(async (banner) => {
            return {
              ...banner,
              imageUrl: await this.minioService.getFileUrl(banner.filename),
            } as unknown as Banner;
          })),
        }
      })
      .catch(() => {
        throw new NotFoundException(`Partner with slug ${slug} not found`);
      });
  }

  async update(id: string, image: Express.Multer.File, updatePartnerDto: UpdatePartnerDto) {
    await this.findOne(id);

    let newFilename;
    if (image) {
        const processedImageBuffer = await sharp(image.buffer).resize(1920, 1080).webp().toBuffer();
        newFilename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';
        await this.minioService.uploadFile(processedImageBuffer, newFilename);
    }

    await this.partnersRepository.update(id, {
      ...updatePartnerDto,
      logoFilename: newFilename,
    });

    return {
      message: `Partner updated successfully`,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.partnersRepository.softDelete(id);

    return;
  }
}
