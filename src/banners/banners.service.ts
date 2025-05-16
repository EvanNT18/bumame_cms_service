import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationMeta,
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { MinioService } from 'src/storage/minio.service';
import { Partner } from 'src/partners/entities/partner.entity';
import sharp from 'sharp';

@Injectable()
export class BannersService {
  constructor(
    @Inject(MinioService)
    private readonly minioService: MinioService,

    @InjectRepository(Banner)
    private readonly bannersRepository: Repository<Banner>,

    @InjectRepository(Partner)
    private readonly partnersRepository: Repository<Partner>,
  ) {}

  async create(image: Express.Multer.File, createBannerDto: CreateBannerDto) {
    if (!image) throw new BadRequestException('image is required');

    const partner = await this.partnersRepository
      .findOneByOrFail({ id: createBannerDto.partnerId })
      .catch(() => {
        throw new NotFoundException(
          `Partner with id ${createBannerDto.partnerId} not found`,
        );
      });

    const processedImageBuffer = await sharp(image.buffer)
      .resize(1920, 1080)
      .webp()
      .toBuffer();
    const filename =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';
    await this.minioService.uploadFile(processedImageBuffer, filename);

    const { partnerId, ...bannerData } = createBannerDto;
    await this.bannersRepository
      .create({
        filename,
        partner,
        ...bannerData,
      })
      .save();

    return {
      message: 'Banner created successfully',
    };
  }

  async index(options: IPaginationOptions) {
    const queryBuilder = this.bannersRepository.createQueryBuilder('banner');

    queryBuilder.leftJoinAndSelect('banner.partner', 'partner');

    const { items, meta, links } = await paginate<Banner>(
      queryBuilder,
      options,
    );
    const bannerItems = await Promise.all(
      items.map(async (banner) => {
        return {
          ...banner,
          imageUrl: await this.minioService.getFileUrl(banner.filename),
        } as unknown as Banner;
      }),
    );

    return {
      items: bannerItems,
      meta,
      links,
    } as Pagination<Banner, IPaginationMeta>;
  }

  async findOne(id: string) {
    return this.bannersRepository
      .findOneOrFail({ where: { id }, relations: ['partner'] })
      .then(async (banner) => {
        return {
          ...banner,
          imageUrl: await this.minioService.getFileUrl(banner.filename),
        };
      })
      .catch(() => {
        throw new NotFoundException(`Banner with id ${id} not found`);
      });
  }

  async update(
    id: string,
    image: Express.Multer.File,
    updateBannerDto: UpdateBannerDto,
  ) {
    const oldBanner = await this.findOne(id);

    let newFilename;
    if (image) {
      const processedImageBuffer = await sharp(image.buffer)
        .resize(1920, 1080)
        .webp()
        .toBuffer();
      newFilename =
        Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';
      await this.minioService.uploadFile(processedImageBuffer, newFilename);
    }

    let newPartner;
    if (updateBannerDto.partnerId) {
      newPartner = await this.partnersRepository
        .findOneByOrFail({ id: updateBannerDto.partnerId })
        .catch(() => {
          throw new NotFoundException(
            `Partner with id ${updateBannerDto.partnerId} not found`,
          );
        });
    }

    const { partnerId, ...bannerData } = updateBannerDto;
    await this.bannersRepository.update(id, {
      filename: newFilename,
      partner: newPartner,
      ...bannerData,
    });

    if (newFilename) await this.minioService.deleteFile(oldBanner.filename);

    return {
      message: 'Banner updated successfully',
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.bannersRepository.softDelete(id);

    return;
  }
}
