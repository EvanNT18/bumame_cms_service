import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PreviewVoucherDto, PreviewVoucherResponseDto } from './dto/preview-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Voucher } from './entities/voucher.entity';
import { VoucherPreview } from './entities/voucher-preview.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Partner } from 'src/partners/entities/partner.entity';
import { Term } from 'src/terms/entities/term.entity';
import { MinioService } from 'src/storage/minio.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VouchersService {
  private readonly WA_LINK = (couponCode: string) =>
  `https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+${encodeURIComponent(couponCode)}`;
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
    @InjectRepository(Voucher)
    private vouchersRepository: Repository<Voucher>,  
    @InjectRepository(Term)
    private termsRepository: Repository<Term>,
    @InjectRepository(VoucherPreview)
    private voucherPreviewRepository: Repository<VoucherPreview>,
    @Inject(MinioService)
    private readonly minioService: MinioService,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
  const { partnerId, terms, typeLink, link, voucherCode, ...voucherData } = createVoucherDto;

  const partner = await this.partnersRepository.findOneBy({ id: partnerId });
  if (!partner) throw new Error('Partner not found');

  // 🔁 Set link berdasarkan typeLink
  let finalLink: string | null = null;
  if (typeLink === 'wa') {
    finalLink = this.WA_LINK(voucherCode); // gunakan voucherCode sebagai couponCode
  } else if (typeLink === 'custom') {
    if (!link) throw new Error('Link is required for custom type');
    finalLink = link;
  }

  const voucher = this.vouchersRepository.create({
    ...voucherData,
    partner,
    typeLink,
    link: finalLink,
    voucherCode, // pastikan voucherCode disimpan
  });

  const savedVoucher = await this.vouchersRepository.save(voucher);

  if (terms && terms.length > 0) {
    const termEntities = terms.map(term =>
      this.termsRepository.create({ ...term, voucher: savedVoucher })
    );

    await this.termsRepository.save(termEntities);
    savedVoucher.terms = termEntities;
  }

  return savedVoucher;
}

  async index(options: IPaginationOptions) {
    const queryBuilder = this.vouchersRepository.createQueryBuilder('voucher');

    queryBuilder.leftJoinAndSelect('voucher.partner', 'partner',);
    queryBuilder.leftJoinAndSelect('voucher.terms', 'terms')

    return paginate<Voucher>(queryBuilder, options);
  }

  async findOne(id: string) {
    return this.vouchersRepository
      .findOneOrFail({ where: { id }, relations: ['partner', 'terms'] })
      .catch(() => {
        throw new NotFoundException(`Voucher with id ${id} not found`);
      });
  }

  async findBySlug(slug: string) {
  try {
    // Cari voucher berdasarkan slug
    const voucher = await this.vouchersRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.partner', 'partner')
      .leftJoinAndSelect('voucher.terms', 'terms')
      .leftJoinAndSelect('partner.banners', 'partnerBanners')
      .leftJoinAndSelect('partner.faqs', 'partnerFaqs')
      .where('voucher.slug = :slug', { slug })
      .getOne();

    if (!voucher) {
      throw new NotFoundException(`Voucher with slug ${slug} not found`);
    }

    // Jika voucher ditemukan, tambahkan imageUrl untuk setiap banner
    const partnerWithImages = {
      ...voucher.partner,
      banners: await Promise.all(
        voucher.partner.banners.map(async (banner) => ({
          ...banner,
          imageUrl: await this.minioService.getFileUrl(banner.filename, this.minioService.BANNERS_BUCKET),
        }))
      ),
    };

    // Mengganti partner dengan partner yang sudah memiliki imageUrl
    return {
      ...voucher,
      partner: partnerWithImages,
    };
  } catch (error) {
    // Tangani error jika ada
    console.error("Error fetching voucher by slug:", error);
    throw error;
  }
}
  async update(id: string, updateVoucherDto: UpdateVoucherDto): Promise<Voucher> {
  const { partnerId, terms, typeLink, link, voucherCode, ...voucherData } = updateVoucherDto;

  const voucher = await this.vouchersRepository.findOne({
    where: { id },
    relations: ['terms', 'partner'],
  });

  if (!voucher) throw new NotFoundException('Voucher not found');

  // 🔁 Update voucherCode secara eksplisit
  if (voucherCode !== undefined) {
    voucher.voucherCode = voucherCode;
  }

  // 🔁 Set typeLink & link
  if (typeLink !== undefined) {
    voucher.typeLink = typeLink;

    const code = voucherCode || voucher.voucherCode;
    if (typeLink === 'wa') {
      voucher.link = this.WA_LINK(code);
    } else if (typeLink === 'custom') {
      if (!link) throw new Error('Link is required for custom type');
      voucher.link = link;
    }
  }

  // 🔁 Update field lainnya
  Object.assign(voucher, voucherData); // sisanya tetap update normal

  return await this.vouchersRepository.save(voucher);
}

  async remove(id: string) {
    await this.findOne(id);

    await this.vouchersRepository.softDelete(id);

    return;
  }

  // Preview Voucher Methods
  async createPreview(previewVoucherDto: PreviewVoucherDto): Promise<PreviewVoucherResponseDto> {
    // Generate session ID if not provided
    const sessionId = previewVoucherDto.sessionId || `preview-${uuidv4()}`;
    
    // Set expiration time (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Prepare preview data (exclude sessionId from the stored data)
    const { sessionId: _, ...previewData } = previewVoucherDto;
    
    // Set link based on typeLink for preview
    let finalLink: string | null = null;
    if (previewData.typeLink === 'wa') {
      finalLink = this.WA_LINK(previewData.voucherCode);
    } else if (previewData.typeLink === 'custom') {
      finalLink = previewData.link || null;
    }

    const previewDataWithLink = {
      ...previewData,
      link: finalLink,
    };

    // Delete existing preview with same session ID
    await this.voucherPreviewRepository.delete({ sessionId });

    // Create new preview
    const voucherPreview = this.voucherPreviewRepository.create({
      sessionId,
      previewData: JSON.stringify(previewDataWithLink),
      expiresAt,
    });

    const savedPreview = await this.voucherPreviewRepository.save(voucherPreview);

    return {
      sessionId: savedPreview.sessionId,
      previewData: previewDataWithLink,
      expiresAt: savedPreview.expiresAt,
    };
  }

  async getPreview(sessionId: string): Promise<PreviewVoucherResponseDto> {
    const preview = await this.voucherPreviewRepository.findOne({
      where: { sessionId },
    });

    if (!preview) {
      throw new NotFoundException(`Preview with session ID ${sessionId} not found`);
    }

    // Check if preview has expired
    if (new Date() > preview.expiresAt) {
      await this.voucherPreviewRepository.delete({ sessionId });
      throw new NotFoundException(`Preview with session ID ${sessionId} has expired`);
    }

    // Parse JSON string to object
    let parsedPreviewData: any;
    try {
      parsedPreviewData = JSON.parse(preview.previewData);
    } catch (error) {
      throw new Error('Invalid preview data format');
    }

    return {
      sessionId: preview.sessionId,
      previewData: parsedPreviewData,
      expiresAt: preview.expiresAt,
    };
  }

  async deletePreview(sessionId: string): Promise<void> {
    const result = await this.voucherPreviewRepository.delete({ sessionId });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Preview with session ID ${sessionId} not found`);
    }
  }

  async cleanupExpiredPreviews(): Promise<void> {
    await this.voucherPreviewRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}
