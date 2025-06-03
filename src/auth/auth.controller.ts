import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

class RegisterDto {
    email: string;
    password: string;
    role?: 'ADMIN' | 'MAHASISWA';
}

class LoginDto {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.email, dto.password, dto.role);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }

  // Logout biasanya hanya di sisi client dengan menghapus token,
  // tapi bisa buat endpoint dummy untuk logout jika perlu.
}
