import { PartialType } from '@nestjs/mapped-types';
import { Create_thesis_schedule } from './create-schedule.dto';

export class Updated_schedule_dto extends PartialType(Create_thesis_schedule) {}