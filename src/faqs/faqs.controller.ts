import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqsController {
  constructor(private readonly service: FaqsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Buat FAQ baru' })
  create(@Body() dto: CreateFaqDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua FAQ' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil FAQ berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID dari FAQ' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update FAQ berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID dari FAQ' })
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Hapus FAQ berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'UUID dari FAQ' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
