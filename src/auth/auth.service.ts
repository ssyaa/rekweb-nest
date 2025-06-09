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
        // Cek apakah User sudah ada
        const UserExist = await this.prisma.user.findUnique({ where: { email } });
        if (UserExist) throw new ConflictException('Email sudah digunakan');

        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await this.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
        },
        });
        return { id: User.id, email: User.email, role: User.role };
    }

    async validateUser(email: string, password: string) {
        const User = await this.prisma.user.findUnique({ where: { email } });
        if (!User) throw new UnauthorizedException('Email atau password salah');

        const validPassword = await bcrypt.compare(password, User.password);
        if (!validPassword) throw new UnauthorizedException('Email atau password salah');

        return User;
    }

    async login(email: string, password: string) {
        const User = await this.validateUser(email, password);
        const payload = { sub: User.id, email: User.email, role: User.role };
        return {
        access_token: this.jwtService.sign(payload),
        User: {
            id: User.id,
            email: User.email,
            role: User.role,
        },
        };
    }

  // Logout biasanya dilakukan di client (hapus token).
  // Jika mau implementasi token blacklist, butuh penyimpanan tambahan.
}
