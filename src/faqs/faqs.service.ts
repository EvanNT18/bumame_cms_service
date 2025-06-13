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

  async create(dto: CreateFaqDto) {
    const faq = this.faqRepo.create({
      question: dto.question,
      answer: dto.answer,
      partner: { id: dto.partnerId },
    });

    await this.faqRepo.save(faq);

    return {
      message: 'FAQ created successfully',
    };
  }

  findAll() {
    return this.faqRepo.find({ relations: ['partner'] });
  }

  async findOne(id: string) {
    const faq = await this.faqRepo.findOne({
      where: { id },
      relations: ['partner'],
    });
    if (!faq) throw new NotFoundException('FAQ not found');
    return faq;
  }

  async update(id: string, dto: UpdateFaqDto) {
    await this.findOne(id);

    await this.faqRepo.update(id, {
      question: dto.question,
      answer: dto.answer,
      partner: dto.partnerId ? { id: dto.partnerId } : undefined,
    });

    return {
      message: 'FAQ updated successfully',
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.faqRepo.softDelete(id);

    return;
  }
}