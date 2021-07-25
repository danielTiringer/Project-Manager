import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';

const testName = 'Test User';
const testEmail = 'test@example.com';
const testPassword = 'password';

const oneUser = new User(testName, testEmail, testPassword);

describe('UsersService', () => {
  let usersService: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should get a single user', () => {
      const repositorySpy = jest.spyOn(repository, 'findOne');
      expect(
        usersService.findOne({ email: 'test@example.com' }),
      ).resolves.toEqual(oneUser);
      expect(repositorySpy).toBeCalledWith({ email: 'test@example.com' });
    });
  });
});
