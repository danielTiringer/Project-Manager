import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../models/user.entity';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';

const testName = 'Test User';
const testEmail = 'test@example.com';
// const takenEmail = 'taken@example.com';
const testPassword = 'password';
const hashedPassword = 'p@sSw0rd';

const oneUser = new User(testName, testEmail, testPassword);
// const emailTakenUser = new User(testName, takenEmail, testPassword);

jest.mock('bcrypt');

describe('UsersController', () => {
  let userController: UserController;
  let userService: UserService;
  const findByEmail = jest.fn();

  const bcryptHash = jest.fn().mockReturnValue(hashedPassword);
  (bcrypt.hash as jest.Mock) = bcryptHash;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOneByEmail: findByEmail,
            create: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('register', () => {
    it('should attempt to get a user by email', async () => {
      const serviceSpy = jest.spyOn(userService, 'findOneByEmail');
      await userController.register(testName, testEmail, testPassword);
      expect(serviceSpy).toHaveBeenCalledWith(testEmail);
    });
    describe('and the email is not used yet', () => {
      beforeEach(() => {
        findByEmail.mockReturnValue(undefined);
      });
      it('should return the user', async () => {
        await expect(
          userController.register(testName, testEmail, testPassword),
        ).resolves.toEqual(oneUser);
      });
    });
    describe('and the email is already used', () => {
      beforeEach(() => {
        findByEmail.mockReturnValue(oneUser);
      });
      it('should throw an error', async () => {
        await expect(
          userController.register(testName, testEmail, testPassword),
        ).rejects.toThrow();
      });
    });
  });
});
