import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Partner } from 'src/partners/entities/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Partner])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
