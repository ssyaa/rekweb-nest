import { Module } from '@nestjs/common';
import { PengajuanService } from './pengajuan.service';
import { PengajuanController } from './pengajuan.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PengajuanController],
    providers: [PengajuanService],
})
export class PengajuanModule {}
