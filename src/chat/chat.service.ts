import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Updated import
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs'; // Import this utility to convert Observables to Promises

@Injectable()
export class ChatService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getChatResponse(message: string): Promise<any> {
    const apiKey = this.configService.get<string>('CHAT_API_KEY');
    const response = await lastValueFrom(
      this.httpService.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: message,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      ),
    );
    return response.data;
  }
}
