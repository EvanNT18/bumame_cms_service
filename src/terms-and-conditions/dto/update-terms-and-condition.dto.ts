import { PartialType } from '@nestjs/mapped-types';
import { CreateTermsAndConditionsDto } from './create-terms-and-condition.dto';

export class UpdateTermsAndConditionsDto extends PartialType(CreateTermsAndConditionsDto) {}