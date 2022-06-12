import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user || !this.comparePassword(password, user.password)) {
      return null;
    }

    delete user.password;
    return user;
  }

  async comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
