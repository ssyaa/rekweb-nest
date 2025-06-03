import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePengajuanDto {
    @IsString()
    @IsNotEmpty()
    judulSkripsi: string;

    @IsUrl()
    @IsNotEmpty()
    berkasUrl: string;
}
