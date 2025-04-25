import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  providers: [FaqService],
  controllers:[FaqController],
  exports: [TypeOrmModule, FaqService] 
})
export class FaqModule {}