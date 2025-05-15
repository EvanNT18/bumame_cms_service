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
<<<<<<< HEAD
  const subtitle = this.subtitleRepo.create({
    text: dto.text,
    partner: { id: dto.partnerId }, 
  });
  return {
    message: 'Subtitle created successfully',
  }
}

=======
    const subtitle = this.subtitleRepo.create({
      text: dto.text,
      partner: { id: dto.partnerId },
    });
    return this.subtitleRepo.save(subtitle);
  }
>>>>>>> 9aecf93ffa0f73772242483e8743171ceaf1201f

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

<<<<<<< HEAD
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
=======
    return this.subtitleRepo.save(subtitle);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.subtitleRepo.softDelete(id);
>>>>>>> 9aecf93ffa0f73772242483e8743171ceaf1201f
  }
}
