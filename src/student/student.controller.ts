import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Student_service } from './student.service';
import { Create_student_dto } from './dto/create-student.dto';

@Controller('Student_controller')
export class Student_controller {
    constructor(private Student_service: Student_service) {}

    @Get()
    async findAll() {
        return this.Student_service.findAll();
    }

    @Get(':nim')
    async findOne(@Param('nim') nim: string) {
        return this.Student_service.findOne(nim);
    }

    @Post()
    async create(@Body() dto: Create_student_dto) {
        return this.Student_service.create(dto);
    }

    @Put(':nim')
    async update(@Param('nim') nim: string, @Body() dto: Partial<Create_student_dto>) {
        return this.Student_service.update(nim, dto);
    }

    @Delete(':nim')
    async remove(@Param('nim') nim: string) {
        return this.Student_service.remove(nim);
    }
}
