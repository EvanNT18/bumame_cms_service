import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './entities/subtitle.entity';
import { SubtitleService } from './subtitle.service';
import { SubtitleController } from './subtitle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subtitle])],
  controllers: [SubtitleController],
  providers: [SubtitleService],
  exports: [TypeOrmModule] // Penting: Ekspor TypeOrmModule
})
export class SubtitleModule {}