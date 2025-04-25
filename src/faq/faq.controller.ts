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
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @ApiOperation({ summary: 'Dapatkan semua FAQ aktif' })
  @ApiResponse({ status: 200, description: 'List FAQ aktif' })
  findAll() {
    return this.faqService.findAll();
  }

  @Get('all')
  @ApiOperation({ summary: 'Dapatkan semua FAQ (termasuk non-aktif)' })
  @ApiResponse({ status: 200, description: 'List semua FAQ' })
  findAllForAdmin() {
    return this.faqService.findAllForAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dapatkan FAQ by ID' })
  @ApiParam({ name: 'id', description: 'ID FAQ' })
  @ApiResponse({ status: 200, description: 'Detail FAQ' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat FAQ baru' })
  @ApiBody({ type: CreateFaqDto })
  @ApiResponse({ status: 201, description: 'FAQ berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Input tidak valid' })
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update FAQ' })
  @ApiParam({ name: 'id', description: 'ID FAQ' })
  @ApiBody({ type: UpdateFaqDto })
  @ApiResponse({ status: 200, description: 'FAQ berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus FAQ' })
  @ApiParam({ name: 'id', description: 'ID FAQ' })
  @ApiResponse({ status: 200, description: 'FAQ berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }

  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Toggle status aktif FAQ' })
  @ApiParam({ name: 'id', description: 'ID FAQ' })
  @ApiResponse({ status: 200, description: 'Status berhasil diubah' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  toggleStatus(@Param('id') id: string) {
    return this.faqService.toggleStatus(id);
  }
}