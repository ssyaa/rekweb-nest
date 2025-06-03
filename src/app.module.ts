import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PengajuanController } from './pengajuan/pengajuan.controller';
import { PengajuanService } from './pengajuan/pengajuan.service';
import { MahasiswaService } from './mahasiswa/mahasiswa.service';
import { MahasiswaController } from './mahasiswa/mahasiswa.controller';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenService } from './dosen/dosen.service';
import { DosenModule } from './dosen/dosen.module';
import { PengajuanModule } from './pengajuan/pengajuan.module';
import { JadwalSidangModule } from './jadwal/jadwal.module';


@Module({
  imports: [AuthModule, PrismaModule, MahasiswaModule, DosenModule, PengajuanModule, JadwalSidangModule],
  controllers: [AppController, PengajuanController, MahasiswaController],
  providers: [AppService, PrismaService, PengajuanService, MahasiswaService, DosenService],
})
export class AppModule {}
