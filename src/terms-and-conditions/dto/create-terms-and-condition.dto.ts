import { IsString } from 'class-validator';

export class CreateTermsAndConditionsDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
}