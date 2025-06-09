import { Module } from '@nestjs/common';
import { Examiner_service } from './examiner.service';
import { Examiner_controller } from './examiner.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [Examiner_controller],
  providers: [Examiner_service],
})
export class Examiner_module {}
