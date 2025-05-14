import { IsString } from "class-validator";

export class CreatePartnerDto {
    @IsString()
    name: string;

    @IsString()
    logo_url: string;

    @IsString()
    slug: string;
}
