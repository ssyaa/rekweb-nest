import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJadwalSidangDto } from './dto/create-jadwal.dto';
import { UpdateJadwalSidangDto } from './dto/update-jadwal.dto';

@Injectable()
export class JadwalSidangService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.jadwalSidang.findMany({
        include: {
            pengajuan: { include: { mahasiswa: true } },
            dosenPenguji1: true,
            dosenPenguji2: true,
        },
        });
    }

    async findOne(id: string) {
        const jadwal = await this.prisma.jadwalSidang.findUnique({
        where: { id },
        include: {
            pengajuan: { include: { mahasiswa: true } },
            dosenPenguji1: true,
            dosenPenguji2: true,
        },
        });
        if (!jadwal) {
        throw new NotFoundException(`Jadwal sidang dengan id ${id} tidak ditemukan`);
        }
        return jadwal;
    }

    async create(dto: CreateJadwalSidangDto) {
        // Cek pengajuan apakah sudah disetujui
        const pengajuan = await this.prisma.pengajuanSidang.findUnique({
        where: { id: dto.pengajuanId },
        });
        if (!pengajuan) throw new NotFoundException('Pengajuan tidak ditemukan');
        if (pengajuan.status !== 'DISETUJUI') {
        throw new Error('Pengajuan harus dalam status DISETUJUI untuk dijadwalkan');
        }

        return this.prisma.jadwalSidang.create({
        data: {
            pengajuanId: dto.pengajuanId,
            tanggal: dto.tanggal,
            waktu: dto.waktu,
            dosenPenguji1Id: dto.dosenPenguji1Id,
            dosenPenguji2Id: dto.dosenPenguji2Id,
        },
        });
    }

    async update(id: string, dto: UpdateJadwalSidangDto) {
        await this.findOne(id); // pastikan jadwal ada

        return this.prisma.jadwalSidang.update({
        where: { id },
        data: {
            tanggal: dto.tanggal,
            waktu: dto.waktu,
            dosenPenguji1Id: dto.dosenPenguji1Id,
            dosenPenguji2Id: dto.dosenPenguji2Id,
        },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.jadwalSidang.delete({ where: { id } });
    }
}
