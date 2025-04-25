import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BannerModule } from './banner/banner.module';
import { SubtitleModule } from './subtitle/subtitle.module';
import { join } from 'path';
import { StorageModule } from './storage/minio.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FaqModule } from './faq/faq.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DatabaseModule,
    BannerModule,
    SubtitleModule,
    FaqModule,
    TermsAndConditionsModule,
    VoucherModule,
    StorageModule,
  ],
})
export class AppModule {}