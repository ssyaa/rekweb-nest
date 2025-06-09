import { Module } from '@nestjs/common';
import { Submission_service } from './submission.service';
import { Submission_controller } from './submission.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [Submission_controller],
    providers: [Submission_service],
})
export class Submission_module {}
