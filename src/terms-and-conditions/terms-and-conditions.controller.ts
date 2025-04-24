import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateTermsAndConditionsDto } from './dto/create-terms-and-condition.dto';
import { UpdateTermsAndConditionsDto } from './dto/update-terms-and-condition.dto';

@ApiTags('Terms and Conditions')
@Controller('terms-and-conditions')
export class TermsAndConditionsController {
    constructor(private readonly termsAndConditionsService: TermsAndConditionsService) {}

    @Post()
    @ApiOperation({ summary: 'Create new terms and conditions' })
    @ApiResponse({ status: 201, description: 'Terms and conditions created successfully' })
    async create(@Body() createTermsAndConditionsDto: CreateTermsAndConditionsDto) {
        return await this.termsAndConditionsService.create(createTermsAndConditionsDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all terms and conditions (sorted by latest first)' })
    async findAll() {
        return await this.termsAndConditionsService.findAll();
    }

    @Get('latest')
    @ApiOperation({ summary: 'Get the latest terms and conditions' })
    async findLatest() {
        return await this.termsAndConditionsService.findLatest();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get terms and conditions by ID' })
    @ApiParam({ name: 'id', type: String, format: 'uuid' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.termsAndConditionsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update terms and conditions' })
    @ApiParam({ name: 'id', type: String, format: 'uuid' })
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateTermsAndConditionsDto: UpdateTermsAndConditionsDto,
    ) {
        return await this.termsAndConditionsService.update(id, updateTermsAndConditionsDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete terms and conditions' })
    @ApiParam({ name: 'id', type: String, format: 'uuid' })
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.termsAndConditionsService.remove(id);
    }
}