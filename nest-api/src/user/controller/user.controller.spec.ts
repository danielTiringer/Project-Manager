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

  const bcryptHash = jest.fn().mockReturnValue(hashedPassword);
  (bcrypt.hash as jest.Mock) = bcryptHash;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue(null),
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
    it('should check if the email already exists', async () => {
      const serviceSpy = jest.spyOn(userService, 'findOneByEmail');
      expect(
        userController.register(testName, testEmail, testPassword),
      ).resolves.toEqual(oneUser);
      expect(serviceSpy).toHaveBeenCalledWith(testEmail);
    });
  });
});
