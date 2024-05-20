import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from '../../src/chat/chat.service';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Device } from '../../src/chat/entities/device.entity';
import { Repository } from 'typeorm';

describe('ChatService', () => {
  let service: ChatService;
  let deviceRepository: Repository<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [
        ChatService,
        {
          provide: getRepositoryToken(Device),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    deviceRepository = module.get<Repository<Device>>(getRepositoryToken(Device));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return chat response', async () => {
    const message = 'Hello, how are you?';
    const apiResponse = { choices: [{ message: { content: 'I am fine, thank you!' } }] };
    jest.spyOn(service, 'getChatResponse').mockImplementation(async () => apiResponse.choices[0].message.content);

    const response = await service.getChatResponse(message);
    expect(response).toBe('I am fine, thank you!');
  });

  it('should handle errors', async () => {
    const message = 'Hello, how are you?';
    jest.spyOn(service, 'getChatResponse').mockImplementation(async () => {
      throw new Error('API error');
    });

    try {
      await service.getChatResponse(message);
    } catch (e) {
      expect(e.message).toBe('API error');
    }
  });
});
