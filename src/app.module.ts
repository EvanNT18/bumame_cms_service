import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import { join } from 'path';
import { StorageModule } from './storage/minio.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { TermsModule } from './terms/terms.module';
import { FaqsModule } from './faqs/faqs.module';



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
    StorageModule,
    PartnersModule,
    SubtitlesModule,
    TermsModule,
    FaqsModule,
  ],
})
export class AppModule {}