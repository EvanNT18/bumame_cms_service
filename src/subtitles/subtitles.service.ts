import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtitle } from './entities/subtitle.entity';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';

@Injectable()
export class SubtitlesService {
  constructor(
    @InjectRepository(Subtitle)
    private readonly subtitleRepo: Repository<Subtitle>,
  ) {}

  async create(dto: CreateSubtitleDto) {
  const subtitle = this.subtitleRepo.create({
    text: dto.text,
    partner: { id: dto.partnerId }, 
  });
  return {
    message: 'Subtitle created successfully',
  }
}


  findAll() {
    return this.subtitleRepo.find({ relations: ['partner'] });
  }

  async findOne(id: string) {
    const subtitle = await this.subtitleRepo.findOne({
      where: { id },
      relations: ['partner'],
    });
    if (!subtitle) throw new NotFoundException('Subtitle not found');
    return subtitle;
  }

  async update(id: string, dto: UpdateSubtitleDto) {
    const subtitle = await this.findOne(id);

    subtitle.text = dto.text ?? 'Default subtitle text';

    if (dto.partnerId) {
      subtitle.partner = { id: dto.partnerId } as any;
    }

  if (dto.partnerId) {
  subtitle.partner = { id: dto.partnerId } as any;
}


  return {
    message: 'Subtitle updated successfully',
  } 
}


  async remove(id: string) {
    await this.findOne(id);   
    return;
  }
}
