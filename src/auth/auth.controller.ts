import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post ('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.createUser(name, email, password)
    }
    @Post('login')
    async login(@Body() body: {email: string; password: string}) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        return this.authService.login(user);
    }
    @Post('logout')
    logout() {
        return this.authService.logout();
    }
}
