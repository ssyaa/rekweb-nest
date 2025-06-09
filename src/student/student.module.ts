import { Module } from '@nestjs/common';
import { Student_service } from './student.service';
import { Student_controller } from './student.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [Student_controller],
    providers: [Student_service],
})
export class Student_module {}
