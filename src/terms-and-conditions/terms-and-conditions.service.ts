import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTermsAndConditionsDto } from './dto/create-terms-and-condition.dto';
import { UpdateTermsAndConditionsDto } from './dto/update-terms-and-condition.dto';
import { TermsAndConditions } from './entities/terms-and-condition.entity';


@Injectable()
export class TermsAndConditionsService {
    constructor(
        @InjectRepository(TermsAndConditions)
        private readonly termsAndConditionsRepository: Repository<TermsAndConditions>,
    ) {}

    async create(createDto: CreateTermsAndConditionsDto): Promise<TermsAndConditions> {
        const terms = this.termsAndConditionsRepository.create(createDto);
        return await this.termsAndConditionsRepository.save(terms);
    }

    async findAll(): Promise<TermsAndConditions[]> {
        return await this.termsAndConditionsRepository.find({
            order: { updated_at: 'DESC' }
        });
    }

    async findOne(id: string): Promise<TermsAndConditions> {
      const terms = await this.termsAndConditionsRepository.findOne({ 
          where: { id }
      });
      if (!terms) {
          throw new NotFoundException(`Terms and Conditions with ID ${id} not found`);
      }
      return terms;
  }

    async findLatest(): Promise<TermsAndConditions | null> {
        const [latest] = await this.termsAndConditionsRepository.find({
            order: { updated_at: 'DESC' },
            take: 1
        });
        return latest || null;
    }

    async update(id: string, updateDto: UpdateTermsAndConditionsDto): Promise<TermsAndConditions> {
        const terms = await this.findOne(id);
        Object.assign(terms, updateDto);
        return await this.termsAndConditionsRepository.save(terms);
    }

    async remove(id: string): Promise<void> {
        const terms = await this.findOne(id);
        await this.termsAndConditionsRepository.remove(terms);
    }
}