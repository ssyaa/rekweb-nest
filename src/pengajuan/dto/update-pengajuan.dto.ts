import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum StatusPengajuan {
    MENUNGGU = 'MENUNGGU',
    DISETUJUI = 'DISETUJUI',
    DITOLAK = 'DITOLAK',
}

export class UpdatePengajuanDto {
    @IsEnum(StatusPengajuan)
    status: StatusPengajuan;

    @IsString()
    @IsOptional()
    alasanPenolakan?: string;
}
