import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_submission_dto } from './dto/create-submission.dto';
import { Updated_submission_dto } from './dto/update-submission.dto';

@Injectable()
export class Submission_service {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.thesis_submission.findMany({
        include: { student: true, thesis_schedule: true },
        });
    }

    async findOne(id: string) {
        const submission = await this.prisma.thesis_submission.findUnique({
        where: { id },
        include: { student: true, thesis_schedule: true },
        });
        if (!submission) {
        throw new NotFoundException(`submission dengan id ${id} tidak ditemukan`);
        }
        return submission;
    }

    async findByName(name: string) {
        return this.prisma.thesis_submission.findMany({
        where: {
            student: {
            name: {
                contains: name,
            },
            },
        },
        include: {
            student: true,
            thesis_schedule: {
            include: {
                examiner_1: true,
                examiner_2: true,
            },
            },
        },
        });
    }

    async create(nim: string, dto: Create_submission_dto) {
        // cek student
        const student = await this.prisma.student.findUnique({ where: { nim } });
        if (!student) {
        throw new NotFoundException('Mahasiswa tidak ditemukan');
        }

        return this.prisma.thesis_submission.create({
        data: {
            student_id: nim,
            thesis_title: dto.thesis_title,
            file_url: dto.file_url,
            status: 'MENUNGGU',
        },
        });
    }

    async updateStatus(id: string, dto: Updated_submission_dto) {
        const submission = await this.findOne(id);

        return this.prisma.thesis_submission.update({
        where: { id },
        data: {
            status: dto.status,
            reason_rejected: dto.reason_rejected,
        },
        });
    }

    async getStatus(id: string) {
        const submission = await this.prisma.thesis_submission.findUnique({
            where: { id },
            select: { status: true }, // hanya ambil status saja
        });
        if (!submission) {
            throw new NotFoundException(`submission dengan id ${id} tidak ditemukan`);
        }
        return submission.status;
    }


    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.thesis_submission.delete({ where: { id } });
    }

    async getStatistik() {
        const totalsubmission = await this.prisma.thesis_submission.count();
        const submissionDisetujui = await this.prisma.thesis_submission.count({
            where: { status: 'DISETUJUI' },
        });
        const submissionDitolak = await this.prisma.thesis_submission.count({
            where: { status: 'DITOLAK' },
        });
        const submissionMenunggu = await this.prisma.thesis_submission.count({
            where: { status: 'MENUNGGU' },
        });
        const totalJadwal = await this.prisma.thesis_schedule.count();

        return {
        totalsubmission,
        submissionDisetujui,
        submissionDitolak,
        submissionMenunggu,
        totalJadwal,
        };
}
}
