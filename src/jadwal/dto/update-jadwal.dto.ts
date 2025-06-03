import { PartialType } from '@nestjs/mapped-types';
import { CreateJadwalSidangDto } from './create-jadwal.dto';

export class UpdateJadwalSidangDto extends PartialType(CreateJadwalSidangDto) {}