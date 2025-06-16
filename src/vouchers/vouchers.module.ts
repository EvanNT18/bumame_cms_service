import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { VoucherPreview } from './entities/voucher-preview.entity';
import { Partner } from 'src/partners/entities/partner.entity';
import { Term } from 'src/terms/entities/term.entity';
import { MinioService } from 'src/storage/minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, VoucherPreview, Term, Partner])],
  controllers: [VouchersController],
  providers: [VouchersService, MinioService],
})
export class VouchersModule {}
