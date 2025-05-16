import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Partner } from './entities/partner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/banners/entities/banner.entity';
import { MinioService } from 'src/storage/minio.service';

@Injectable()
export class PartnersService {
  constructor(
    @Inject(MinioService)
    private readonly minioService: MinioService,

    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    await this.partnersRepository.create(createPartnerDto).save();

    return {
      message: `Partner created successfully`,
    };
  }

  async index(options: IPaginationOptions) {
    return await paginate<Partner>(this.partnersRepository, options);
  }

  async findOne(id: string) {
    return this.partnersRepository.findOneOrFail({ where: { id }, relations: ['vouchers', 'banners', 'subtitles', 'faqs', 'terms'] })
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

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    await this.findOne(id);

    await this.partnersRepository.update(id, updatePartnerDto);

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
