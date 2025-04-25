import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTermsAndConditionsDto {

    @ApiProperty({ 
        example: 'Terms & Conditions',
        description: 'Title For The Terms & Conditions' })
    @IsString()
    title: string;

    @ApiProperty({ 
        example: '# Offer Terms & Conditions\n\n## Validity Period\nPromo valid from...',
        description: 'Content for the terms' })
    @IsString()
    content: string;
}