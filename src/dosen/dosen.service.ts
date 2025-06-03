import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDosenDto } from './dto/create-dosen.dto';

@Injectable()
export class DosenService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.dosen.findMany();
    }

    async findOne(id: string) {
        const dosen = await this.prisma.dosen.findUnique({ where: { id } });
        if (!dosen) {
        throw new NotFoundException(`Dosen dengan ID ${id} tidak ditemukan`);
        }
        return dosen;
    }

    async create(dto: CreateDosenDto) {
        return this.prisma.dosen.create({
        data: {
            nama: dto.nama,
            email: dto.email,
        },
        });
    }

    async update(id: string, dto: Partial<CreateDosenDto>) {
        await this.findOne(id); // pastikan ada
        return this.prisma.dosen.update({
        where: { id },
        data: dto,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.dosen.delete({ where: { id } });
    }
}
