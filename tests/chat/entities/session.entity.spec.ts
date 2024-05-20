import { Session } from '../../../src/chat/entities/session.entity';

describe('Session Entity', () => {
  it('should be defined', () => {
    expect(new Session()).toBeDefined();
  });
});
