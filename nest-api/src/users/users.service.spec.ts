import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';

const testName = 'Test User';
const testEmail = 'test@example.com';
const testPassword = 'password';
const testErrorMessage = 'Test Error Message';

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
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
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

  describe('findOneOrFail', () => {
    it('should get a single user', () => {
      const repositorySpy = jest.spyOn(repository, 'findOneOrFail');
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

  describe('delete', () => {
    it('should return { deleted: true } if successful', () => {
      expect(usersService.delete(1)).resolves.toEqual({ deleted: true });
    });
    it('should return { deleted: flase, message: error.message } if fails', () => {
      const repositorySpy = jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new Error(testErrorMessage));
      expect(usersService.delete(1)).resolves.toEqual({
        deleted: false,
        message: testErrorMessage,
      });
      expect(repositorySpy).toBeCalledWith({ id: 1 });
      expect(repositorySpy).toBeCalledTimes(1);
    });
  });
});
