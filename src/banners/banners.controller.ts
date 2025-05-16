import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, DefaultValuePipe, ParseIntPipe, Query, HttpCode } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Banners')
@Controller('banners')
export class BannersController {
    constructor(private readonly bannersService: BannersService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({
        summary: 'Create a new banner',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                partnerId: {
                    type: 'string',
                },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Banner created successfully',
    })
    @UseInterceptors(FileInterceptor('image', multerOptions))
    create(@UploadedFile() image: Express.Multer.File, @Body() createBannerDto: CreateBannerDto) {
        return this.bannersService.create(image, createBannerDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Paginate banners',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number for pagination',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Number of items per page',
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description: 'Paginated banners',
    })
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    ) {
        page = page ?? 1;
        limit = limit ?? 10;
        limit = limit > 100 ? 100 : limit;
        return this.bannersService.index({
            page,
            limit,
        });
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a banner by id',
    })
    @ApiParam({
        name: 'id',
        description: 'Banner id',
    })
    @ApiResponse({
        status: 200,
        description: 'Banner found',
    })
    findOne(@Param('id') id: string) {
        return this.bannersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update a banner',
    })
    @ApiParam({
        name: 'id',
        description: 'Banner id',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                partnerId: {
                    type: 'string',
                },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Banner updated',
    })
    @UseInterceptors(FileInterceptor('image', multerOptions))
    update(@Param('id') id: string,  @UploadedFile() image: Express.Multer.File, @Body() updateBannerDto: UpdateBannerDto) {
        return this.bannersService.update(id, image, updateBannerDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Delete a banner',
    })
    @ApiParam({
        name: 'id',
        description: 'Banner id',
    })
    @ApiResponse({
        status: 204,
        description: 'Banner deleted',
    })
    remove(@Param('id') id: string) {
        return this.bannersService.remove(id);
    }
}
