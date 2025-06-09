import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { Submission_service } from './submission.service';
import { Create_submission_dto } from './dto/create-submission.dto';
import { Updated_submission_dto } from './dto/update-submission.dto';

@Controller('Submission_controller')
export class Submission_controller {
    constructor(private Submission_service: Submission_service) {}

    @Get()
    async findByName(@Query('name') name: string) {
        return this.Submission_service.findByName(name);
    }

    @Get('statistik')
    async getStatistik() {
        return this.Submission_service.getStatistik();
    }

    @Get('status')
    getStatusPengajuan(@Query('user_id') userId: string) {
        return this.Submission_service.getStatus(userId);
    }

    @Post('status')
    async createPengajuan(@Body() dto: Create_submission_dto) {
        return this.Submission_service.create(dto.nim, dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.Submission_service.findOne(id);
    }

    // Buat pengajuan baru dengan nim mahasiswa sebagai param
    @Post(':nim')
    async create(@Param('nim') nim: string, @Body() dto: Create_submission_dto) {
        return this.Submission_service.create(nim, dto);
    }

    // Update status dan alasan penolakan pengajuan
    @Put(':id/status')
    async updateStatus(@Param('id') id: string, @Body() dto: Updated_submission_dto) {
        return this.Submission_service.updateStatus(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.Submission_service.remove(id);
    }
}
