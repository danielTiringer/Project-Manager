import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { UserService } from './user.service';

const testName = 'Test User';
const testEmail = 'test@example.com';
const testPassword = 'password';
const testErrorMessage = 'Test Error Message';

const oneUser = new User(testName, testEmail, testPassword);

describe('UserService', () => {
  let userService: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    userService = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should get a single user', () => {
      const repositorySpy = jest.spyOn(repository, 'findOneOrFail');
      expect(userService.findOneByEmail('test@example.com')).resolves.toEqual(
        oneUser,
      );
      expect(repositorySpy).toBeCalledWith({ email: 'test@example.com' });
    });
  });

  describe('findOneById', () => {
    it('should get a single user', () => {
      const repositorySpy = jest.spyOn(repository, 'findOneOrFail');
      expect(userService.findOneById(1)).resolves.toEqual(oneUser);
      expect(repositorySpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should successfully insert a user', () => {
      expect(
        userService.create({
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
      const user = await userService.update({
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
      expect(userService.delete(1)).resolves.toEqual({ deleted: true });
    });
    it('should return { deleted: flase, message: error.message } if fails', () => {
      const repositorySpy = jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new Error(testErrorMessage));
      expect(userService.delete(1)).resolves.toEqual({
        deleted: false,
        message: testErrorMessage,
      });
      expect(repositorySpy).toBeCalledWith({ id: 1 });
      expect(repositorySpy).toBeCalledTimes(1);
    });
  });
});
