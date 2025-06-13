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

    if (await this.partnersRepository.findOneBy({ slug: createPartnerDto.slug }))
      throw new BadRequestException('Slug already exists');
    
    const processedImageBuffer = await sharp(image.buffer).webp().toBuffer();
    const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';
    await this.minioService.uploadFile(
      processedImageBuffer,
      filename,
      this.minioService.PARTNER_LOGOS_BUCKET
    );

    const partner = this.partnersRepository.create({
    ...createPartnerDto,
    logoFilename: filename,
  });

  await this.partnersRepository.save(partner);

    return {
      message: `Partner created successfully`,
    };
  }

  async index(options: IPaginationOptions) {
    return await paginate<Partner>(this.partnersRepository, options, {
      relations: [`vouchers`,'vouchers.terms']
    }).then(async (partners) => {
      return {
        items: await Promise.all(partners.items.map(async (partner) => {
          return {
            ...partner,
            logoUrl: await this.minioService.getFileUrl(partner.logoFilename, this.minioService.PARTNER_LOGOS_BUCKET),
          } as unknown as Partner;
        })),
        meta: partners.meta,
        links: partners.links,
      } as Pagination<Partner, IPaginationMeta>;
    });
  }

  async findOne(id: string) {
    return this.partnersRepository.findOneOrFail({ where: { id }, relations: ['vouchers', 'banners', 'subtitles', 'faqs'] })
      .then(async (partner) => {
        return {
          ...partner,
          logoUrl: await this.minioService.getFileUrl(partner.logoFilename, this.minioService.PARTNER_LOGOS_BUCKET),
          banners: await Promise.all(partner.banners.map(async (banner) => {
            return {
              ...banner,
              imageUrl: await this.minioService.getFileUrl(banner.filename, this.minioService.BANNERS_BUCKET),
            } as unknown as Banner;
          })),
        }
      })
      .catch(() => {
        throw new NotFoundException(`Partner with id ${id} not found`);
      });
  }

  async findOneBySlug(slug: string) {
    return this.partnersRepository.findOneOrFail({ where: { slug }, relations: [`vouchers`,'vouchers.terms', 'banners', 'subtitles', 'faqs'] })
      .then(async (partner) => {
        return {
          ...partner,
          logoUrl: await this.minioService.getFileUrl(partner.logoFilename, this.minioService.PARTNER_LOGOS_BUCKET),
          banners: await Promise.all(partner.banners.map(async (banner) => {
            return {
              ...banner,
              imageUrl: await this.minioService.getFileUrl(banner.filename, this.minioService.BANNERS_BUCKET),
            } as unknown as Banner;
          })),
        }
      })
      .catch(() => {
        throw new NotFoundException(`Partner with slug ${slug} not found`);
      });
  }

  async update(id: string, image: Express.Multer.File, updatePartnerDto: UpdatePartnerDto) {
    const oldPartner = await this.findOne(id);

    let newFilename;
    if (image) {
        const processedImageBuffer = await sharp(image.buffer).webp().toBuffer();
        newFilename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';
        await this.minioService.uploadFile(
          processedImageBuffer,
          newFilename,
          this.minioService.PARTNER_LOGOS_BUCKET,
        );
    }

    await this.partnersRepository.update(id, {
      ...updatePartnerDto,
      logoFilename: newFilename,
    });

    if (newFilename) await this.minioService.deleteFile(oldPartner.logoFilename, this.minioService.PARTNER_LOGOS_BUCKET);

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