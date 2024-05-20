import { UserProfile } from '../../../src/auth/entities/user-profile.entity';

describe('UserProfile Entity', () => {
  it('should be defined', () => {
    expect(new UserProfile()).toBeDefined();
  });
});
