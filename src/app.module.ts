import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PengajuanController } from './pengajuan/pengajuan.controller';
import { PengajuanService } from './pengajuan/pengajuan.service';


@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController, PengajuanController],
  providers: [AppService, PrismaService, PengajuanService],
})
export class AppModule {}
