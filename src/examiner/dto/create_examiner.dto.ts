import { IsString, IsEmail, IsOptional } from 'class-validator';

export class Create_examiner_dto {
    @IsString()
    name: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}
