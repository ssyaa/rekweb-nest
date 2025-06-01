// pengajuan.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PengajuanService } from './pengajuan.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pengajuan')
export class PengajuanController {
    constructor(private readonly pengajuanService: PengajuanService) {}

    @UseGuards(AuthGuard('jwt')) // Pastikan pakai JWT auth atau sesuai setupmu
    @Post()
    async createPengajuan(@Body() dto: any, @Req() req) {
        const userId = req.user.userId; // Ambil dari token
        return this.pengajuanService.createPengajuan(userId, dto);
    }
}
