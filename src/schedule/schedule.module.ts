import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { Schedule_service } from './schedule.service';
import { Schedule_controller } from './schedule.controller';

@Module({
    imports: [PrismaModule],
    controllers: [Schedule_controller],
    providers: [Schedule_service],
})
export class Schedule_module {}
