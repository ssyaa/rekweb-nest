import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { CreateDosenDto } from './dto/create-dosen.dto';

@Controller('dosen')
export class DosenController {
    constructor(private dosenService: DosenService) {}

    @Get()
    async findAll() {
        return this.dosenService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.dosenService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateDosenDto) {
        return this.dosenService.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: Partial<CreateDosenDto>) {
        return this.dosenService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.dosenService.remove(id);
    }
}
