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
<<<<<<< HEAD
  const faq = this.faqRepo.create({
    question: dto.question,
    answer: dto.answer,
    partner: { id: dto.partnerId },
  });
  return {
    message: 'FAQ created successfully',
  }
}

=======
    const faq = this.faqRepo.create({
      question: dto.question,
      answer: dto.answer,
      partner: { id: dto.partnerId },
    });
    return this.faqRepo.save(faq);
  }
>>>>>>> 9aecf93ffa0f73772242483e8743171ceaf1201f

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
    const existing = await this.findOne(id);

<<<<<<< HEAD
  const updated = this.faqRepo.merge(existing, {
    question: dto.question,
    answer: dto.answer,
    partner: dto.partnerId ? { id: dto.partnerId } : existing.partner, 
  });

  return {
    message: 'FAQ updated successfully',
  }
}
=======
    const updated = this.faqRepo.merge(existing, {
      question: dto.question,
      answer: dto.answer,
      partner: dto.partnerId ? { id: dto.partnerId } : existing.partner,
    });
>>>>>>> 9aecf93ffa0f73772242483e8743171ceaf1201f

    return this.faqRepo.save(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    return;
  }
}
