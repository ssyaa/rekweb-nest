import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PengajuanService } from './pengajuan.service';
import { CreatePengajuanDto } from './dto/create-pengajuan.dto';
import { UpdatePengajuanDto } from './dto/update-pengajuan.dto';

@Controller('pengajuan')
export class PengajuanController {
    constructor(private pengajuanService: PengajuanService) {}

    @Get()
    async findAll() {
        return this.pengajuanService.findAll();
    }

    @Get('statistik')
    async getStatistik() {
        return this.pengajuanService.getStatistik();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.pengajuanService.findOne(id);
    }

    // Buat pengajuan baru dengan nim mahasiswa sebagai param
    @Post(':nim')
    async create(@Param('nim') nim: string, @Body() dto: CreatePengajuanDto) {
        return this.pengajuanService.create(nim, dto);
    }

    // Update status dan alasan penolakan pengajuan
    @Put(':id/status')
    async updateStatus(@Param('id') id: string, @Body() dto: UpdatePengajuanDto) {
        return this.pengajuanService.updateStatus(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.pengajuanService.remove(id);
    }
}
