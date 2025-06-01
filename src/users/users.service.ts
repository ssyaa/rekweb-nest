import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // login
    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    // register
    async createUser(name: string, email: string, password: string): Promise<User> {
        return this.prisma.user.create({
        data: {
            name,
            email,
            password,
        },
        });
    }
    }
