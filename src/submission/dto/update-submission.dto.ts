import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Submission_status {
    MENUNGGU = 'MENUNGGU',
    DISETUJUI = 'DISETUJUI',
    DITOLAK = 'DITOLAK',
}

export class Updated_submission_dto {
    @IsEnum(Submission_status)
    status: Submission_status;

    @IsString()
    @IsOptional()
    reason_rejected?: string;
}
