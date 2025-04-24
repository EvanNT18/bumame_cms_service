import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = this.faqRepository.create(createFaqDto);
    return await this.faqRepository.save(faq);
  }

  async findAll(): Promise<Faq[]> {
    return await this.faqRepository.find({
      where: { is_active: true },
    });
  }

  async findAllForAdmin(): Promise<Faq[]> {
    return await this.faqRepository.find();
  }

  async findOne(id: string): Promise<Faq> {
    const faq = await this.faqRepository.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.findOne(id);
    this.faqRepository.merge(faq, updateFaqDto);
    return await this.faqRepository.save(faq);
  }

  async remove(id: string): Promise<void> {
    const faq = await this.findOne(id);
    await this.faqRepository.remove(faq);
  }

  async toggleStatus(id: string): Promise<Faq> {
    const faq = await this.findOne(id);
    faq.is_active = !faq.is_active;
    return await this.faqRepository.save(faq);
  }
}