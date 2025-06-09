import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Schedule_service } from './schedule.service';
import { Create_thesis_schedule } from './dto/create-schedule.dto';
import { Updated_schedule_dto } from './dto/update-schedule.dto';

@Controller('Schedule_controller')
export class Schedule_controller {
    constructor(private readonly Schedule_service: Schedule_service) {}

    @Get()
    async findAll() {
        return this.Schedule_service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.Schedule_service.findOne(id);
    }

    @Post()
    async create(@Body() dto: Create_thesis_schedule) {
        return this.Schedule_service.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: Updated_schedule_dto) {
        return this.Schedule_service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.Schedule_service.remove(id);
    }
}
