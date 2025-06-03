import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';

@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private mahasiswaService: MahasiswaService) {}

    @Get()
    async findAll() {
        return this.mahasiswaService.findAll();
    }

    @Get(':nim')
    async findOne(@Param('nim') nim: string) {
        return this.mahasiswaService.findOne(nim);
    }

    @Post()
    async create(@Body() dto: CreateMahasiswaDto) {
        return this.mahasiswaService.create(dto);
    }

    @Put(':nim')
    async update(@Param('nim') nim: string, @Body() dto: Partial<CreateMahasiswaDto>) {
        return this.mahasiswaService.update(nim, dto);
    }

    @Delete(':nim')
    async remove(@Param('nim') nim: string) {
        return this.mahasiswaService.remove(nim);
    }
}
