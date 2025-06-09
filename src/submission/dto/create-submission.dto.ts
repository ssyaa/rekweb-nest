import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class Create_submission_dto {
    @IsString()
    @IsNotEmpty()
    thesis_title: string;

    @IsUrl()
    @IsNotEmpty()
    file_url: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    nim: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
