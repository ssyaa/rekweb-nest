import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JadwalSidangService } from './jadwal.service';
import { CreateJadwalSidangDto } from './dto/create-jadwal.dto';
import { UpdateJadwalSidangDto } from './dto/update-jadwal.dto';

@Controller('jadwal-sidang')
export class JadwalSidangController {
    constructor(private readonly jadwalSidangService: JadwalSidangService) {}

    @Get()
    async findAll() {
        return this.jadwalSidangService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.jadwalSidangService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateJadwalSidangDto) {
        return this.jadwalSidangService.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateJadwalSidangDto) {
        return this.jadwalSidangService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.jadwalSidangService.remove(id);
    }
}
