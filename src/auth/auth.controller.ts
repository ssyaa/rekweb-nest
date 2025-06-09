// auth.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { access_token, user } = await this.authService.login(email, password);

        // Set cookie di sini
        res.cookie('token', access_token, {
        httpOnly: true,
        secure: false, // Ganti ke true di production (HTTPS)
        maxAge: 1000 * 60 * 60 * 24, // 1 hari
        });

        return { message: 'Login berhasil', user };
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('token');
        return { message: 'Logout berhasil' };
    }
}
