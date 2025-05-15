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
    const term = this.termRepo.create(dto);
    return this.termRepo.save(term);
  }

  findAll() {
    return this.termRepo.find({ relations: ['partner'] });
  }

  async findOne(id: string) {
    const term = await this.termRepo.findOne({ where: { id }, relations: ['partner'] });
    if (!term) throw new NotFoundException('Term not found');
    return term;
  }

  async update(id: string, dto: UpdateTermDto) {
    await this.findOne(id);
    await this.termRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.termRepo.softDelete(id);
  }
}
