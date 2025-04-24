import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get('all') 
  findAllForAdmin() {
    return this.faqService.findAllForAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }

  @Patch(':id/toggle-status')
  toggleStatus(@Param('id') id: string) {
    return this.faqService.toggleStatus(id);
  }
}