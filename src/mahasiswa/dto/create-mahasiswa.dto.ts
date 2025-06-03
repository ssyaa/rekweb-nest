import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateMahasiswaDto {
  @IsString()
  nim: string;

  @IsString()
  nama: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  prodi?: string;
}
