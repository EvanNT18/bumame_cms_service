import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private faqRepo: Repository<Faq>,
  ) {}

  create(dto: CreateFaqDto) {
    const faq = this.faqRepo.create(dto);
    return this.faqRepo.save(faq);
  }

  findAll() {
    return this.faqRepo.find({ relations: ['partner'] });
  }

  async findOne(id: string) {
    const faq = await this.faqRepo.findOne({ where: { id }, relations: ['partner'] });
    if (!faq) throw new NotFoundException('FAQ not found');
    return faq;
  }

  async update(id: string, dto: UpdateFaqDto) {
    await this.findOne(id);
    await this.faqRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.faqRepo.softDelete(id);
  }
}
