import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PengajuanController } from './submission/pengajuan.controller';
import { PengajuanService } from './submission/pengajuan.service';
import { MahasiswaService } from './student/mahasiswa.service';
import { MahasiswaController } from './student/mahasiswa.controller';
import { MahasiswaModule } from './student/mahasiswa.module';
import { DosenService } from './examiner/examiner.service';
import { DosenModule } from './examiner/examiner.module';
import { PengajuanModule } from './submission/pengajuan.module';
import { JadwalSidangModule } from './jadwal/jadwal.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [AuthModule, PrismaModule, MahasiswaModule, DosenModule, PengajuanModule, JadwalSidangModule, UserModule],
  controllers: [AppController, PengajuanController, MahasiswaController],
  providers: [AppService, PrismaService, PengajuanService, MahasiswaService, DosenService],
})
export class AppModule {}
