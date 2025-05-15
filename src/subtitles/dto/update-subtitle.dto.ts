import { PartialType } from '@nestjs/swagger';
import { CreateSubtitleDto } from './create-subtitle.dto';
import { IsUUID, IsOptional, IsString } from 'class-validator';

export class UpdateSubtitleDto extends PartialType(CreateSubtitleDto) {
  @IsUUID()
  @IsOptional()
  partnerId?: string;
}
