import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from './entities/term.entity';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@Injectable()
export class TermsService {
  constructor(
    @InjectRepository(Term)
    private readonly termRepo: Repository<Term>,
  ) {}

  async create(dto: CreateTermDto) {
    const term = this.termRepo.create({
      text: dto.text,
      partner: { id: dto.partnerId },
    });

    await this.termRepo.save(term);

    return {
      message: 'Term created successfully',
    };
  }

  findAll() {
    return this.termRepo.find({ relations: ['partner'] });
  }

  async findOne(id: string) {
    const term = await this.termRepo.findOne({
      where: { id },
      relations: ['partner'],
    });
    if (!term) throw new NotFoundException('Term not found');
    return term;
  }

  async update(id: string, dto: UpdateTermDto) {
    await this.findOne(id);

    await this.termRepo.update(id, {
      text: dto.text,
      partner: dto.partnerId ? { id: dto.partnerId } : undefined,
    });

    return {
      message: 'Term updated successfully',
    };
  }

  async remove(id: string) {
    await this.findOne(id);
    return;
  }
}
