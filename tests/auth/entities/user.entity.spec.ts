import { User } from '../../../src/auth/entities/user.entity';

describe('User Entity', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
