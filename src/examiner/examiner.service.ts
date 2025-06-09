import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_examiner_dto } from './dto/create_examiner.dto';

@Injectable()
export class Examiner_service {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.examiner.findMany();
    }

    async findOne(id: string) {
        const Examiner = await this.prisma.examiner.findUnique({ where: { id } });
        if (!Examiner) {
        throw new NotFoundException(`Dosen dengan ID ${id} tidak ditemukan`);
        }
        return Examiner;
    }

    async create(dto: Create_examiner_dto) {
        return this.prisma.examiner.create({
        data: {
            name: dto.name,
            email: dto.email,
        },
        });
    }

    async update(id: string, dto: Partial<Create_examiner_dto>) {
        await this.findOne(id); // pastikan ada
        return this.prisma.examiner.update({
        where: { id },
        data: dto,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.examiner.delete({ where: { id } });
    }
}
