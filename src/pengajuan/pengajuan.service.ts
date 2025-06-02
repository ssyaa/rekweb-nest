// pengajuan.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PengajuanService {
  constructor(private prisma: PrismaService) {}

  async createPengajuan(userId: number, data: {
    nim: string;
    nama: string;
    judulSkripsi: string;
    berkasUrl: string;
  }) {
    // Cek apakah sudah ada pengajuan disetujui
    const existing = await this.prisma.pengajuanSidang.findUnique({
      where: { userId },
    });

    if (existing && existing.status === 'disetujui') {
      throw new BadRequestException('Pengajuan sudah disetujui, tidak bisa diajukan ulang');
    }

    // Upsert pengajuan: update jika sudah ada, atau buat baru
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
