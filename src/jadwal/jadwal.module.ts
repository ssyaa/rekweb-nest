import { Module } from '@nestjs/common';
import { JadwalSidangService } from './jadwal.service';
import { JadwalSidangController } from './jadwal.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [JadwalSidangController],
    providers: [JadwalSidangService],
})
export class JadwalSidangModule {}
