import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
