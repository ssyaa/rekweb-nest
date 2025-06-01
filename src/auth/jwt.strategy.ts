import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'SECRET_KEY', // Ganti dengan process.env.JWT_SECRET di production
        });
    }

    async validate(payload: any) {
        // data ini akan tersedia di request.user setelah guard berjalan
        return { userId: payload.sub, email: payload.email };
    }
}