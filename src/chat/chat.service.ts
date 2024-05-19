import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';

@Injectable()
export class ChatService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async getChatResponse(message: string): Promise<any> {
    // Example: Querying the database for device-specific information
    const deviceInfo = await this.deviceRepository.findOne({ where: { name: 'exampleDevice' } });

    // Modify the message or include the device info in the request
    const modifiedMessage = `${message} Here is some device info: ${deviceInfo?.details || 'No info available'}`;

    const apiKey = this.configService.get<string>('CHAT_API_KEY');
    const response = await lastValueFrom(
      this.httpService.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: modifiedMessage }],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      ),
    );
    return response.data.choices[0].message.content;
  }
}
