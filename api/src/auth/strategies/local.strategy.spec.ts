import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/models/user.entity';
import { AuthService } from '../services/auth.service';

const testName = 'Test User';
const testEmail = 'test@example.com';
const testPassword = 'password';

const oneUser = new User(testName, testEmail, testPassword);

describe('LocalStrategy', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
