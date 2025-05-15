import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Partner } from './entities/partner.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    await this.partnersRepository.create(createPartnerDto).save();

    return {
      message: `Partner created successfully`,
    };
  }

  async index(options: IPaginationOptions) {
    return paginate<Partner>(this.partnersRepository, options);
  }

  async findOne(id: string) {
    return this.partnersRepository.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException(`Partner with id ${id} not found`);
    });
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    await this.findOne(id);

    await this.partnersRepository.update(id, updatePartnerDto);

    return {
      message: `Partner updated successfully`,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.partnersRepository.softDelete(id);

    return {
      message: `Partner deleted successfully`,
    };
  }
}
