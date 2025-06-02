// pengajuan.controller.ts
import { Controller, Post, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { PengajuanService } from './pengajuan.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePengajuanDto } from './dto/pengajuan.dto';

@Controller('pengajuan')
export class PengajuanController {
    constructor(private readonly pengajuanService: PengajuanService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPengajuan(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreatePengajuanDto,
        @Req() req
    ) {
        const userId = req.user.userId;
        return this.pengajuanService.createPengajuan(userId, dto);
    }
}
