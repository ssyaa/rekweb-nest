import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ControllerModule, PrismaModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {expiresIn: '1d'}
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
