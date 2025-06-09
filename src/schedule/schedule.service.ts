import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_thesis_schedule } from './dto/create-schedule.dto';
import { Updated_schedule_dto } from './dto/update-schedule.dto';

@Injectable()
export class Schedule_service {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.thesis_schedule.findMany({
        include: {
            submission: { include: { student: true } },
            examiner_1: true,
            examiner_2: true,
        },
        });
    }

    async findOne(id: string) {
        const schedule = await this.prisma.thesis_schedule.findUnique({
        where: { id },
        include: {
            submission: { include: { student: true } },
            examiner_1: true,
            examiner_2: true,
        },
        });
        if (!schedule) {
        throw new NotFoundException(`Jadwal sidang dengan id ${id} tidak ditemukan`);
        }
        return schedule;
    }

    async create(dto: Create_thesis_schedule) {
        // Cek pengajuan apakah sudah disetujui
        const submission = await this.prisma.thesis_submission.findUnique({
        where: { id: dto.submission_id },
        });
        if (!submission) throw new NotFoundException('Pengajuan tidak ditemukan');
        if (submission.status !== 'DISETUJUI') {
        throw new Error('Pengajuan harus dalam status DISETUJUI untuk dijadwalkan');
        }

        return this.prisma.thesis_schedule.create({
        data: {
            submission_id: dto.submission_id,
            date: dto.date,
            time: dto.time,
            examiner_1_id: dto.examiner_1_id,
            examiner_2_id: dto.examiner_2_id,
        },
        });
    }

    async update(id: string, dto: Updated_schedule_dto) {
        await this.findOne(id); // pastikan jadwal ada

        return this.prisma.thesis_schedule.update({
        where: { id },
        data: {
            date: dto.date,
            time: dto.time,
            examiner_1_id: dto.examiner_1_id,
            examiner_2_id: dto.examiner_2_id,
        },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.thesis_schedule.delete({ where: { id } });
    }
}
