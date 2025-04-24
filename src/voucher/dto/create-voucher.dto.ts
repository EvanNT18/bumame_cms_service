import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional, IsBoolean } from "class-validator";


export class CreateVoucherDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^[A-Z0-9_]+$/, {
      message: 'Voucher code must contain only uppercase letters, numbers, and underscores'
    })
    code: string;
  
    @IsString()
    @IsOptional()
    @Matches(/^[a-z0-9-]+$/, {
      message: 'Slug must contain only lowercase letters, numbers, and hyphens'
    })
    slug?: string;
  
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
  }