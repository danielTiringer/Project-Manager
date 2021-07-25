import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './models/user.entity';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.API_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService],
})
export class UsersModule {}
