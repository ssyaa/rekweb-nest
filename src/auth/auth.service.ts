import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    // login
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login (user:any) {
        const payload = { email: user.email, sub: user.id};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }
    // register
    async createUser(name: string, email: string, password: string): Promise<any>{
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error('Email sudah terdaftar')
        }
        const hashedPassword = await bcrypt.hash(password,10);
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
    //logout
    async logout () {
        return{ message: 'Logout successful'};
    }
}
