import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}