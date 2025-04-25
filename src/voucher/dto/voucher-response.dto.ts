import { ApiProperty } from '@nestjs/swagger';
import { CreateBannerDto } from 'src/banner/dto';
import { CreateFaqDto } from 'src/faq/dto/create-faq.dto';
import { CreateSubtitleDto } from 'src/subtitle/dto';
import { CreateTermsAndConditionsDto } from 'src/terms-and-conditions/dto/create-terms-and-condition.dto';


export class VoucherResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    is_active: boolean;

    @ApiProperty({ type: CreateBannerDto })
    banner: CreateBannerDto;

    @ApiProperty({ type: CreateSubtitleDto })
    subtitle: CreateSubtitleDto;

    @ApiProperty({ type: CreateTermsAndConditionsDto })
    termsAndConditions: CreateTermsAndConditionsDto;

    @ApiProperty({ type: [CreateFaqDto] })
    faqs: CreateFaqDto[];

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}