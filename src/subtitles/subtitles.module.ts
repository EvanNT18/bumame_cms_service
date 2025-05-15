import { Module } from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { SubtitlesController } from './subtitles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './entities/subtitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtitle])],
  controllers: [SubtitlesController],
  providers: [SubtitlesService],
})
export class SubtitlesModule {}
