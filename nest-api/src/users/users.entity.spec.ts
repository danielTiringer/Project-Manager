import { User } from './users.entity';

describe('User class', () => {
  it('should make a user with name, email and password', () => {
    const user = new User('Test User', 'test@example.com', 'password');
    expect(user).toBeTruthy();
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password');
    expect(user.isActive).toBe(true);
  });
});
