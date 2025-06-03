import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateJadwalSidangDto {
    @IsString()
    @IsNotEmpty()
    pengajuanId: string;

    @IsDateString()
    tanggal: string; // ISO date string (yyyy-mm-dd)

    @IsString()
    @IsNotEmpty()
    waktu: string; // Bisa format jam, misal "10:00"

    @IsString()
    @IsNotEmpty()
    dosenPenguji1Id: string;

    @IsString()
    @IsNotEmpty()
    dosenPenguji2Id: string;
}
