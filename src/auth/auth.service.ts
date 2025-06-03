import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(email: string, password: string, role: 'ADMIN' | 'MAHASISWA' = 'MAHASISWA') {
        // Cek apakah user sudah ada
        const userExist = await this.prisma.user.findUnique({ where: { email } });
        if (userExist) throw new ConflictException('Email sudah digunakan');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
        },
        });
        return { id: user.id, email: user.email, role: user.role };
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Email atau password salah');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new UnauthorizedException('Email atau password salah');

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
        access_token: this.jwtService.sign(payload),
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        };
    }

  // Logout biasanya dilakukan di client (hapus token).
  // Jika mau implementasi token blacklist, butuh penyimpanan tambahan.
}
