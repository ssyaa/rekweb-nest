import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Examiner_service } from './examiner.service';
import { Create_examiner_dto } from './dto/create-examiner.dto';

@Controller('Examiner_controller')
export class Examiner_controller {
    constructor(private Examiner_service: Examiner_service) {}

    @Get()
    async findAll() {
        return this.Examiner_service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.Examiner_service.findOne(id);
    }

    @Post()
    async create(@Body() dto: Create_examiner_dto) {
        return this.Examiner_service.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: Partial<Create_examiner_dto>) {
        return this.Examiner_service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.Examiner_service.remove(id);
    }
}
