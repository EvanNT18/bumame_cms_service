import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import { join } from 'path';
import { StorageModule } from './storage/minio.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PartnersModule } from './partners/partners.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VouchersModule } from './vouchers/vouchers.module';
import dataSource from './data-source';
import { FaqsModule } from './faqs/faqs.module';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { TermsModule } from './terms/terms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DatabaseModule,
    StorageModule,
    PartnersModule,
    VouchersModule,
    SubtitlesModule,
    TermsModule,
    FaqsModule,
  ],
})
export class AppModule {}
