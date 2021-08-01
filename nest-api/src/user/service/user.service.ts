import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email: email });
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ id: id });
  }

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(user: User): Promise<User> {
    const { id } = user;
    await this.userRepository.update({ id }, user);
    return this.findOneById(id);
  }

  async delete(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.userRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
