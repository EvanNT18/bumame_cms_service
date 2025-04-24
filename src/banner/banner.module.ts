import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { StorageModule } from 'src/storage/minio.module';


@Module({
  imports: [TypeOrmModule.forFeature([Banner]), StorageModule],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}