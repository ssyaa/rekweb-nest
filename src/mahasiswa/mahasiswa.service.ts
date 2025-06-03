import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';

@Injectable()
export class MahasiswaService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.mahasiswa.findMany();
    }

    async findOne(nim: string) {
        const mahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim } });
        if (!mahasiswa) {
        throw new NotFoundException(`Mahasiswa dengan NIM ${nim} tidak ditemukan`);
        }
        return mahasiswa;
    }

    async create(dto: CreateMahasiswaDto) {
        return this.prisma.mahasiswa.create({
        data: {
            nim: dto.nim,
            nama: dto.nama,
            email: dto.email,
            prodi: dto.prodi,
        },
        });
    }

    async update(nim: string, dto: Partial<CreateMahasiswaDto>) {
        await this.findOne(nim); // pastikan ada
        return this.prisma.mahasiswa.update({
        where: { nim },
        data: dto,
        });
    }

    async remove(nim: string) {
        await this.findOne(nim); // pastikan ada
        return this.prisma.mahasiswa.delete({ where: { nim } });
    }
}
