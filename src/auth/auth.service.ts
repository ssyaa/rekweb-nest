import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    // ✅ Validasi saat login
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (!user) throw new UnauthorizedException('Email tidak ditemukan');

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new UnauthorizedException('Password salah');

        const { password: _, ...result } = user;
        return result;
    }

    // ✅ Login: Return JWT token
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
        access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        };
    }

    // ✅ Register User Baru
    async createUser(name: string, email: string, password: string): Promise<any> {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
        throw new Error('Email sudah terdaftar');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    // ✅ Logout cukup ditangani di frontend
    async logout() {
        return { message: 'Logout berhasil (handled di frontend)' };
    }
}
