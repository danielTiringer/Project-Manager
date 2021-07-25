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
            save: jest.fn().mockResolvedValue(oneUser),
            update: jest.fn().mockResolvedValue(oneUser),
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

  describe('create', () => {
    it('should successfully insert a user', () => {
      expect(
        usersService.create({
          name: testName,
          email: testEmail,
          password: testPassword,
        }),
      ).resolves.toEqual(oneUser);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith({
        name: testName,
        email: testEmail,
        password: testPassword,
      });
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should successfully update a user', async () => {
      const user = await usersService.update({
        id: 1,
        name: testName,
        email: testEmail,
        password: testPassword,
      });
      expect(user).toEqual(oneUser);
      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(
        { id: 1 },
        { name: testName, email: testEmail, password: testPassword, id: 1 },
      );
    });
  });
});
