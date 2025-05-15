// src/terms/terms.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { Term } from './entities/term.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  controllers: [TermsController],
  providers: [TermsService],
})
export class TermsModule {}
