import { IsString, IsEmail, IsOptional } from 'class-validator';

export class Create_student_dto
 {
  @IsString()
  nim: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  study_program?: string;
}
