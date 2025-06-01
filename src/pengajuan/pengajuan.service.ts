// pengajuan.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PengajuanService {
    constructor(private prisma: PrismaService) {}

    async createPengajuan(userId: number, data: any) {
        // Cek apakah sudah ada pengajuan disetujui
        const existing = await this.prisma.pengajuanSidang.findUnique({
        where: { userId },
        });

        if (existing && existing.status === 'disetujui') {
        throw new Error('Pengajuan sudah disetujui, tidak bisa diajukan ulang');
        }

        // Simpan data pengajuan baru / update data lama
    return this.prisma.pengajuanSidang.upsert({
        where: { userId },
        update: {
            nama: data.nama,
            nim: data.nim,
            judulSkripsi: data.judulSkripsi,
            status: 'menunggu persetujuan',
            berkasUrl: data.berkasUrl,
            tanggalPengajuan: new Date(),
        },
        create: {
            userId,
            nama: data.nama,
            nim: data.nim,
            judulSkripsi: data.judulSkripsi,
            status: 'menunggu persetujuan',
            berkasUrl: data.berkasUrl,
            tanggalPengajuan: new Date(),
        },
        });
    }
}
