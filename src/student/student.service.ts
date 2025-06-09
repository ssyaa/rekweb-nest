import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_student_dto } from './dto/create-student.dto';

@Injectable()
export class Student_service {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.student.findMany();
    }

    async findOne(nim: string) {
        const Student = await this.prisma.student.findUnique({ where: { nim } });
        if (!Student) {
        throw new NotFoundException(`Mahasiswa dengan NIM ${nim} tidak ditemukan`);
        }
        return Student;
    }

    async create(dto: Create_student_dto) {
        return this.prisma.student.create({
        data: {
            nim: dto.nim,
            name: dto.name,
            email: dto.email,
            study_program: dto.study_program,
        },
        });
    }

    async update(nim: string, dto: Partial<Create_student_dto>) {
        await this.findOne(nim); // pastikan ada
        return this.prisma.student.update({
        where: { nim },
        data: dto,
        });
    }

    async remove(nim: string) {
        await this.findOne(nim); // pastikan ada
        return this.prisma.student.delete({ where: { nim } });
    }
}
