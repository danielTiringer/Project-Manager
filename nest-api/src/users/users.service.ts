import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOneOrFail(condition);
  }

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(user: User): Promise<User> {
    const { id } = user;
    await this.userRepository.update({ id }, user);
    return this.findOne(id);
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
