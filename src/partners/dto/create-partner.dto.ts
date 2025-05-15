import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
    @ApiProperty({
        description: 'Name of the partner',
        example: 'Corporation ABC, Inc.',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'URL of the partner logo',
        example: 'https://example.com/logo.png',
    })
    @IsString()
    logoUrl: string;

    @ApiProperty({
        description: 'Slug for the partner',
        example: 'corporation-abc-inc',
    })
    @IsString()
    slug: string;
}

