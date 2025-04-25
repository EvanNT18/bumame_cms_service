import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { Voucher } from './entities/voucher.entity';
import { Faq } from '../faq/entities/faq.entity'; // Import Faq entity
import { Banner } from 'src/banner/entities/banner.entity';
import { TermsAndConditions } from 'src/terms-and-conditions/entities/terms-and-condition.entity';
import { Subtitle } from 'src/subtitle/entities/subtitle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher, Faq, Banner, TermsAndConditions, Subtitle]), // Tambahkan Faq di sini
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService]
})
export class VoucherModule {}