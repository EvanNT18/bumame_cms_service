import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { MinioService } from 'src/storage/minio.service';
import { Partner } from 'src/partners/entities/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Partner])],
  controllers: [BannersController],
  providers: [BannersService, MinioService],
})
export class BannersModule {}
