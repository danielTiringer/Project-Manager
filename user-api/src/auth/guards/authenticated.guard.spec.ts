import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { AuthenticatedGuard } from './authenticated.guard';

const mockRequest = {
  isAuthenticated: () => true,
};

const mockExecutionContect = createMock<ExecutionContext>({
  switchToHttp: () => ({
    getRequest: () => mockRequest,
  }),
});

describe('AuthenticatedGuard class', () => {
  const authenticatedGuard = new AuthenticatedGuard();

  it('should return if a user is authenticated', () => {
    expect(
      authenticatedGuard.canActivate(mockExecutionContect),
    ).resolves.toEqual(true);
  });
});
