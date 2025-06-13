import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import { StorageModule } from './storage/minio.module';
import { PartnersModule } from './partners/partners.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VouchersModule } from './vouchers/vouchers.module';
import dataSource from './data-source';
import { FaqsModule } from './faqs/faqs.module';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { TermsModule } from './terms/terms.module';
import { BannersModule } from './banners/banners.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    StorageModule,
    PartnersModule,
    VouchersModule,
    SubtitlesModule,
    TermsModule,
    FaqsModule,
    BannersModule,
  ],
})
export class AppModule {}
