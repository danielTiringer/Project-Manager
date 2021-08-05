import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const checkIfEmailIsAlreadyInUse = await this.userService.findOneByEmail(
      email,
    );

    if (checkIfEmailIsAlreadyInUse) {
      throw new ConflictException('Email address already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('logout')
  async logout(@Request() req) {
    req.logout();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('user')
  async user(@Request() req) {
    return req.user;
  }
}
