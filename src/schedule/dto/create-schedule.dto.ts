import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class Create_thesis_schedule {
    @IsString()
    @IsNotEmpty()
    submission_id: string;

    @IsDateString()
    date: string; // ISO date string (yyyy-mm-dd)

    @IsString()
    @IsNotEmpty()
    time: string; // Bisa format jam, misal "10:00"4

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    examiner_1_id: string;

    @IsString()
    @IsNotEmpty()
    examiner_2_id: string;


}
