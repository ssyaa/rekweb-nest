// src/pengajuan/dto/create-pengajuan.dto.ts
import { IsString, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreatePengajuanDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10, { message: 'NIM harus 10 karakter' }) // contoh validasi custom
    nim: string;

    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsString()
    @IsNotEmpty()
    judulSkripsi: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl({}, { message: 'berkasUrl harus berupa URL yang valid' })
    berkasUrl: string;
}
