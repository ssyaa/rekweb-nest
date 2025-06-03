import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateDosenDto {
    @IsString()
    nama: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}
