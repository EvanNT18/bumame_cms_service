import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { MinioService } from 'src/storage/minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  controllers: [PartnersController],
  providers: [PartnersService, MinioService],
})
export class PartnersModule {}
