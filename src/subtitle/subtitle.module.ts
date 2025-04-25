import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './entities/subtitle.entity';
import { SubtitleService } from './subtitle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subtitle])],
  providers: [SubtitleService],
  exports: [TypeOrmModule] // Penting: Ekspor TypeOrmModule
})
export class SubtitleModule {}