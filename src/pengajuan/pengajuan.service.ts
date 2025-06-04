import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePengajuanDto } from './dto/create-pengajuan.dto';
import { UpdatePengajuanDto } from './dto/update-pengajuan.dto';

@Injectable()
export class PengajuanService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.pengajuanSidang.findMany({
        include: { mahasiswa: true, jadwalSidang: true },
        });
    }

    async findOne(id: string) {
        const pengajuan = await this.prisma.pengajuanSidang.findUnique({
        where: { id },
        include: { mahasiswa: true, jadwalSidang: true },
        });
        if (!pengajuan) {
        throw new NotFoundException(`Pengajuan dengan id ${id} tidak ditemukan`);
        }
        return pengajuan;
    }

    async findByNama(nama: string) {
        return this.prisma.pengajuanSidang.findMany({
        where: {
            mahasiswa: {
            nama: {
                contains: nama,
            },
            },
        },
        include: {
            mahasiswa: true,
            jadwalSidang: {
            include: {
                dosenPenguji1: true,
                dosenPenguji2: true,
            },
            },
        },
        });
    }

    async create(nim: string, dto: CreatePengajuanDto) {
        // cek mahasiswa
        const mahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim } });
        if (!mahasiswa) {
        throw new NotFoundException('Mahasiswa tidak ditemukan');
        }

        return this.prisma.pengajuanSidang.create({
        data: {
            mahasiswaId: nim,
            judulSkripsi: dto.judulSkripsi,
            berkasUrl: dto.berkasUrl,
            status: 'MENUNGGU',
        },
        });
    }

    async updateStatus(id: string, dto: UpdatePengajuanDto) {
        const pengajuan = await this.findOne(id);

        return this.prisma.pengajuanSidang.update({
        where: { id },
        data: {
            status: dto.status,
            alasanPenolakan: dto.alasanPenolakan,
        },
        });
    }

    async getStatus(id: string) {
        const pengajuan = await this.prisma.pengajuanSidang.findUnique({
            where: { id },
            select: { status: true }, // hanya ambil status saja
        });
        if (!pengajuan) {
            throw new NotFoundException(`Pengajuan dengan id ${id} tidak ditemukan`);
        }
        return pengajuan.status;
    }


    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.pengajuanSidang.delete({ where: { id } });
    }

    async getStatistik() {
        const totalPengajuan = await this.prisma.pengajuanSidang.count();
        const pengajuanDisetujui = await this.prisma.pengajuanSidang.count({
            where: { status: 'DISETUJUI' },
        });
        const pengajuanDitolak = await this.prisma.pengajuanSidang.count({
            where: { status: 'DITOLAK' },
        });
        const pengajuanMenunggu = await this.prisma.pengajuanSidang.count({
            where: { status: 'MENUNGGU' },
        });
        const totalJadwal = await this.prisma.jadwalSidang.count();

        return {
        totalPengajuan,
        pengajuanDisetujui,
        pengajuanDitolak,
        pengajuanMenunggu,
        totalJadwal,
        };
}
}
