import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './entities/voucher.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Faq } from 'src/faq/entities/faq.entity';
import { Banner } from 'src/banner/entities/banner.entity';
import { Subtitle } from 'src/subtitle/entities/subtitle.entity';
import { TermsAndConditions } from 'src/terms-and-conditions/entities/terms-and-condition.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(Subtitle)
    private readonly subtitleRepository: Repository<Subtitle>,
    @InjectRepository(TermsAndConditions)
    private readonly termsRepository: Repository<TermsAndConditions>,
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    const {
      banner_id,
      subtitle_id,
      terms_and_conditions_id,
      faq_ids,
      ...voucherData
    } = createVoucherDto;
  
    const voucher = this.voucherRepository.create(voucherData);
  
    if (banner_id) {
      const banner = await this.bannerRepository.findOne({ where: { id: banner_id } });
      if (!banner) throw new NotFoundException(`Banner with ID ${banner_id} not found`);
      voucher.banner = banner;
    }
  
    if (subtitle_id) {
      const subtitle = await this.subtitleRepository.findOne({ where: { id: subtitle_id } });
      if (!subtitle) throw new NotFoundException(`Subtitle with ID ${subtitle_id} not found`);
      voucher.subtitle = subtitle;
    }
  
    if (terms_and_conditions_id) {
      const terms = await this.termsRepository.findOne({ where: { id: terms_and_conditions_id } });
      if (!terms) throw new NotFoundException(`Terms with ID ${terms_and_conditions_id} not found`);
      voucher.terms_and_conditions = terms;
    }
  
    if (faq_ids && faq_ids.length > 0) {
      const faqs = await this.faqRepository.findByIds(faq_ids);
      voucher.faqs = faqs;
    }
  
    const savedVoucher = await this.voucherRepository.save(voucher);
  
    // Use QueryBuilder for proper left joins
    const fullVoucher = await this.voucherRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.banner', 'banner')
      .leftJoinAndSelect('voucher.subtitle', 'subtitle')
      .leftJoinAndSelect('voucher.terms_and_conditions', 'terms')
      .leftJoinAndSelect('voucher.faqs', 'faqs')
      .where('voucher.id = :id', { id: savedVoucher.id })
      .getOne();
  
    if (!fullVoucher) {
      throw new NotFoundException(`Voucher with ID ${savedVoucher.id} not found`);
    }
  
    return fullVoucher;
  }
  
  async findOneWithRelations(id: string): Promise<Voucher> {
    const voucher = await this.voucherRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.banner', 'banner')
      .leftJoinAndSelect('voucher.subtitle', 'subtitle')
      .leftJoinAndSelect('voucher.terms_and_conditions', 'terms')
      .leftJoinAndSelect('voucher.faqs', 'faqs')
      .where('voucher.id = :id', { id })
      .getOne();
  
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
  
    return voucher;
  }
  
  async findAll(): Promise<Voucher[]> {
    return await this.voucherRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.banner', 'banner')
      .leftJoinAndSelect('voucher.subtitle', 'subtitle')
      .leftJoinAndSelect('voucher.terms_and_conditions', 'terms')
      .leftJoinAndSelect('voucher.faqs', 'faqs')
      .getMany();
  }

  async findOne(id: string): Promise<Voucher> {
    const voucher = await this.voucherRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.banner', 'banner')
      .leftJoinAndSelect('voucher.subtitle', 'subtitle')
      .leftJoinAndSelect('voucher.terms_and_conditions', 'terms')
      .leftJoinAndSelect('voucher.faqs', 'faqs')
      .where('voucher.id = :id', { id })
      .getOne();

    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }

  async findByCode(code: string): Promise<Voucher> {
    const voucher = await this.voucherRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.banner', 'banner')
      .leftJoinAndSelect('voucher.subtitle', 'subtitle')
      .leftJoinAndSelect('voucher.terms_and_conditions', 'terms')
      .leftJoinAndSelect('voucher.faqs', 'faqs')
      .where('voucher.code = :code', { code })
      .getOne();

    if (!voucher) {
      throw new NotFoundException(`Voucher with code ${code} not found`);
    }
    return voucher;
  }


  async update(id: string, updateVoucherDto: UpdateVoucherDto): Promise<Voucher> {
    const voucher = await this.findOne(id);
    this.voucherRepository.merge(voucher, updateVoucherDto);
    return await this.voucherRepository.save(voucher);
  }

  async remove(id: string): Promise<void> {
    const voucher = await this.findOne(id);
    await this.voucherRepository.remove(voucher);
  }

  async findBySlug(slug: string): Promise<Voucher> {
    const voucher = await this.voucherRepository
      .createQueryBuilder('voucher')
      .leftJoinAndSelect('voucher.banner', 'banner')
      .leftJoinAndSelect('voucher.subtitle', 'subtitle')
      .leftJoinAndSelect('voucher.terms_and_conditions', 'terms')
      .leftJoinAndSelect('voucher.faqs', 'faqs')
      .where('voucher.slug = :slug', { slug })
      .getOne();

    if (!voucher) {
      throw new NotFoundException(`Voucher with slug ${slug} not found`);
    }
    return voucher;
  }

}