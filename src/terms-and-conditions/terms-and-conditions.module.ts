import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { TermsAndConditionsController } from './terms-and-conditions.controller';
import { TermsAndConditions } from './entities/terms-and-condition.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TermsAndConditions])],
    controllers: [TermsAndConditionsController],
    providers: [TermsAndConditionsService],
    exports: [TermsAndConditionsService],
})
export class TermsAndConditionsModule {}