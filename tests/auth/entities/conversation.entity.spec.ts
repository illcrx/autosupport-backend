import { Conversation } from '../../../src/auth/entities/conversation.entity';

describe('Conversation Entity', () => {
  it('should be defined', () => {
    expect(new Conversation()).toBeDefined();
  });
});
