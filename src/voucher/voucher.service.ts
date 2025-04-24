import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './entities/voucher.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    const voucher = this.voucherRepository.create({
      ...createVoucherDto,
      is_active: createVoucherDto.is_active ?? true 
    });
    return await this.voucherRepository.save(voucher);
  }

  async findAll(): Promise<Voucher[]> {
    return await this.voucherRepository.find();
  }

  async findOne(id: string): Promise<Voucher> {
    const voucher = await this.voucherRepository.findOne({ where: { id } });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }

  async findByCode(code: string): Promise<Voucher> {
    const voucher = await this.voucherRepository.findOne({ where: { code } });
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
    const voucher = await this.voucherRepository.findOne({ where: { slug } });
    if (!voucher) {
      throw new NotFoundException(`Voucher with slug ${slug} not found`);
    }
    return voucher;
  }

}