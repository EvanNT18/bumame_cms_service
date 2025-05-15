import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { Faq } from './entities/faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
