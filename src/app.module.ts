import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BannerModule } from './banner/banner.module';
import { SubtitleModule } from './subtitle/subtitle.module';
import { StorageModule } from './storage/minio.module';
import { DatabaseModule } from './database/database.module';


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
  ],
})
export class AppModule {}