import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtitle } from './entities/subtitle.entity';

@Injectable()
export class SubtitleService {
  constructor(
    @InjectRepository(Subtitle)
    private subtitleRepository: Repository<Subtitle>,
  ) {}

  async findAll(): Promise<Subtitle[]> {
    return await this.subtitleRepository.find();
  }

  async findByKey(key: string): Promise<Subtitle> {
    const subtitle = await this.subtitleRepository.findOne({ where: { key } });
    if (!subtitle) {
      throw new NotFoundException('Subtitle not found');
    }
    return subtitle;
  }

  async create(key: string, text: string): Promise<Subtitle> {
    const subtitle = this.subtitleRepository.create({ key, text });
    return await this.subtitleRepository.save(subtitle);
  }

  async update(key: string, text: string): Promise<Subtitle> {
    const subtitle = await this.findByKey(key);
    subtitle.text = text;
    return await this.subtitleRepository.save(subtitle);
  }

  async remove(key: string): Promise<void> {
    await this.subtitleRepository.delete({ key });
  }
}