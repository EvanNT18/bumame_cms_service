import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BannerModule } from './banner/banner.module';
import { SubtitleModule } from './subtitle/subtitle.module';
import { StorageModule } from './storage/minio.module';
import { DatabaseModule } from './database/database.module';
import { VoucherModule } from './voucher/voucher.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { FaqModule } from './faq/faq.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    BannerModule,
    SubtitleModule,
    StorageModule,
    VoucherModule,
    TermsAndConditionsModule,
    FaqModule,
  ],
})
export class AppModule {}