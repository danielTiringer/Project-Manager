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
    return this.userRepository.findOne(condition);
  }

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }
}
